import { CrudRepository } from '../core/crud.repository';
import { Singleton } from '../core/singleton.mixin';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../types/user.types';
import { CreateUserData, UpdateUserData } from '../dtos/user.dto';

/**
 * User Repository Implementation
 * Handles all user-related database operations
 */
class UserRepositoryBase extends CrudRepository<User, CreateUserData, UpdateUserData> implements IUserRepository {
  protected tableName = 'users';
  protected idColumn = 'id';
  protected emailColumn = 'email';

  /**
   * Map database row to User entity
   */
  protected mapRow(row: any): User {
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
   * Create a new user
   */
  async create(data: CreateUserData): Promise<User> {
    return await this.executeTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO ${this.tableName} (id, email, name, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING *`,
        [data.id, data.email, data.name]
      );

      return this.mapRow(result.rows[0]);
    });
  }
}

/**
 * User Repository with Singleton Pattern
 */
const UserRepository = Singleton(UserRepositoryBase);
type UserRepository = InstanceType<typeof UserRepository>;

export default UserRepository;
