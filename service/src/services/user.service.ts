import { IUserService } from '../interfaces/user.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IAccountRepository } from '../interfaces/account.repository.interface';
import { User } from '../types/user.types';
import { RegisterUserInput, UpdateUserInput } from '../dtos/user.dto';
import { CreateUserData, CreateAccountData } from '../dtos';
import bcrypt from 'bcryptjs';
import { userRepository, accountRepository } from '../repositories';

/**
 * User Service Implementation
 * Handles all user-related business logic
 * Singleton Pattern
 */
class UserService implements IUserService {
  private static instance: UserService;
  private userRepository: IUserRepository;
  private accountRepository: IAccountRepository;

  /**
   * Private constructor for singleton pattern
   */
  private constructor(
    userRepo?: IUserRepository,
    accountRepo?: IAccountRepository
  ) {
    this.userRepository = userRepo || userRepository;
    this.accountRepository = accountRepo || accountRepository;
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Register a new user with email and password
   */
  async registerUser(input: RegisterUserInput): Promise<User> {
    // Validate input
    this.validateRegisterInput(input);

    // Check if user already exists
    const exists = await this.userRepository.existsByEmail(input.email);
    if (exists) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(input.password);

    // Generate user ID
    const userId = this.generateUserId();

    // Create user
    const userData: CreateUserData = {
      id: userId,
      email: input.email,
      name: input.name || null,
    };

    const user = await this.userRepository.create(userData);

    // Create credentials account
    const accountData: CreateAccountData = {
      id: this.generateAccountId(),
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
    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    return await this.userRepository.findById(userId);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }

    return await this.userRepository.findByEmail(email);
  }

  /**
   * Update user profile
   */
  async updateUser(userId: string, input: UpdateUserInput): Promise<User> {
    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required');
    }

    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate update input
    this.validateUpdateInput(input);

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

  /**
   * Hash password using bcrypt
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Generate unique user ID
   */
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique account ID
   */
  private generateAccountId(): string {
    return `account_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate register input
   */
  private validateRegisterInput(input: RegisterUserInput): void {
    if (!input.email || input.email.trim() === '') {
      throw new Error('Email is required');
    }

    if (!this.isValidEmail(input.email)) {
      throw new Error('Invalid email format');
    }

    if (!input.password || input.password.trim() === '') {
      throw new Error('Password is required');
    }

    if (input.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
  }

  /**
   * Validate update input
   */
  private validateUpdateInput(input: UpdateUserInput): void {
    if (Object.keys(input).length === 0) {
      throw new Error('At least one field must be provided for update');
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default UserService;
