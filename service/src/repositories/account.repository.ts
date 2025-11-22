import { BaseRepository } from '../core/base.repository';
import { IAccountRepository } from '../interfaces/account.repository.interface';
import { CreateAccountData } from '../dtos/account.dto';

/**
 * Account Repository Implementation
 * Handles all account-related database operations
 * Singleton Pattern
 */
class AccountRepository extends BaseRepository implements IAccountRepository {
  private static instance: AccountRepository;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    super();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): AccountRepository {
    if (!AccountRepository.instance) {
      AccountRepository.instance = new AccountRepository();
    }
    return AccountRepository.instance;
  }

  /**
   * Create a new account
   */
  async create(data: CreateAccountData): Promise<void> {
    await this.executeTransaction(async (client) => {
      await client.query(
        `INSERT INTO accounts (id, user_id, type, provider, provider_account_id, access_token)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.id,
          data.userId,
          data.type,
          data.provider,
          data.providerAccountId,
          data.passwordHash || null,
        ]
      );
    });
  }

  /**
   * Find account by user ID and provider
   */
  async findByUserIdAndProvider(
    userId: string,
    provider: string
  ): Promise<{ access_token: string } | null> {
    const rows = await this.executeQuery<{ access_token: string }>(
      'SELECT access_token FROM accounts WHERE user_id = $1 AND provider = $2',
      [userId, provider]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }
}

export default AccountRepository;
