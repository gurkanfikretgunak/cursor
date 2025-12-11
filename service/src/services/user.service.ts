import { Singleton } from '../core/singleton.mixin';
import { IUserService } from '../interfaces/user.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IAccountRepository } from '../interfaces/account.repository.interface';
import { User } from '../types/user.types';
import { RegisterUserInput, UpdateUserInput } from '../dtos/user.dto';
import { CreateUserData, CreateAccountData } from '../dtos';
import { validateEmail, validatePassword, validateUpdateInput, isNotEmpty } from '../utils/validation';
import { generateUserId, generateAccountId } from '../utils/id-generator';
import bcrypt from 'bcryptjs';
import { userRepository, accountRepository } from '../repositories';

/**
 * User Service Implementation
 * Handles all user-related business logic
 */
class UserServiceBase implements IUserService {
  private userRepository: IUserRepository;
  private accountRepository: IAccountRepository;

  constructor(
    userRepo?: IUserRepository,
    accountRepo?: IAccountRepository
  ) {
    this.userRepository = userRepo || userRepository;
    this.accountRepository = accountRepo || accountRepository;
  }

  /**
   * Register a new user with email and password
   */
  async registerUser(input: RegisterUserInput): Promise<User> {
    // Validate input
    validateEmail(input.email);
    validatePassword(input.password);

    // Check if user already exists
    const exists = await this.userRepository.existsByEmail(input.email);
    if (exists) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(input.password, 10);

    // Generate user ID
    const userId = generateUserId();

    // Create user
    const userData: CreateUserData = {
      id: userId,
      email: input.email,
      name: input.name || null,
    };

    const user = await this.userRepository.create(userData);

    // Create credentials account
    const accountData: CreateAccountData = {
      id: generateAccountId(),
      userId: user.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: input.email,
      passwordHash,
    };

    await this.accountRepository.create(accountData);

    return user;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    isNotEmpty(userId, 'User ID');
    return await this.userRepository.findById(userId);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    validateEmail(email);
    return await this.userRepository.findByEmail(email);
  }

  /**
   * Update user profile
   */
  async updateUser(userId: string, input: UpdateUserInput): Promise<User> {
    isNotEmpty(userId, 'User ID');

    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate update input
    validateUpdateInput(input);

    // Update user
    return await this.userRepository.update(userId, input);
  }

  /**
   * Verify user password
   */
  async verifyPassword(email: string, password: string): Promise<User | null> {
    if (!email || !password) {
      return null;
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const account = await this.accountRepository.findByUserIdAndProvider(
      user.id,
      'credentials'
    );

    if (!account || !account.access_token) {
      return null;
    }

    const isValid = await bcrypt.compare(password, account.access_token);
    if (!isValid) {
      return null;
    }

    return user;
  }

}

/**
 * User Service with Singleton Pattern
 */
const UserService = Singleton(UserServiceBase);
type UserService = InstanceType<typeof UserService>;

export default UserService;
