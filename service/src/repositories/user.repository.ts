import { BaseRepository } from '../core/base.repository';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../types/user.types';
import { CreateUserData, UpdateUserData } from '../dtos/user.dto';

/**
 * User Repository Implementation
 * Handles all user-related database operations
 * Singleton Pattern
 */
class UserRepository extends BaseRepository implements IUserRepository {
  private static instance: UserRepository;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    super();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  /**
   * Map database row to User entity
   */
  private mapUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      emailVerified: row.email_verified ? new Date(row.email_verified) : null,
      image: row.image,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    const rows = await this.executeQuery<{ id: string }>(
      'SELECT id FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return rows.length > 0;
  }

  /**
   * Find user by ID
   */
  async findById(userId: string): Promise<User | null> {
    const rows = await this.executeQuery<any>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapUser(rows[0]);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const rows = await this.executeQuery<any>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapUser(rows[0]);
  }

  /**
   * Create a new user
   */
  async create(data: CreateUserData): Promise<User> {
    return await this.executeTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO users (id, email, name, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING *`,
        [data.id, data.email, data.name]
      );

      return this.mapUser(result.rows[0]);
    });
  }

  /**
   * Update user
   */
  async update(userId: string, data: UpdateUserData): Promise<User> {
    return await this.executeTransaction(async (client) => {
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (data.name !== undefined) {
        updateFields.push(`name = $${paramCount++}`);
        values.push(data.name);
      }

      if (data.image !== undefined) {
        updateFields.push(`image = $${paramCount++}`);
        values.push(data.image);
      }

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      updateFields.push(`updated_at = NOW()`);
      values.push(userId);

      const result = await client.query(
        `UPDATE users 
         SET ${updateFields.join(', ')}
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return this.mapUser(result.rows[0]);
    });
  }
}

export default UserRepository;
