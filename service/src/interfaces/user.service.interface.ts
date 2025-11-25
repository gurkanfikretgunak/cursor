import { User } from '../types/user.types';
import { RegisterUserInput, UpdateUserInput } from '../dtos/user.dto';

/**
 * User Service Interface
 * Defines contract for user business logic operations
 */
export interface IUserService {
  registerUser(input: RegisterUserInput): Promise<User>;
  getUserById(userId: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(userId: string, input: UpdateUserInput): Promise<User>;
  verifyPassword(email: string, password: string): Promise<User | null>;
}


