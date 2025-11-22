import { User } from '../types/user.types';
import { IRepository } from './repository.interface';
import { CreateUserData, UpdateUserData } from '../dtos/user.dto';

/**
 * User Repository Interface
 * Defines contract for user data access operations
 */
export interface IUserRepository extends IRepository<User, CreateUserData, UpdateUserData> {
  existsByEmail(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}


