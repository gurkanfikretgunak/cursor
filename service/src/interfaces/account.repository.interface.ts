import { CreateAccountData } from '../dtos/account.dto';

/**
 * Account Repository Interface
 * Defines contract for account data access operations
 */
export interface IAccountRepository {
  create(data: CreateAccountData): Promise<void>;
  findByUserIdAndProvider(userId: string, provider: string): Promise<{ access_token: string } | null>;
}


