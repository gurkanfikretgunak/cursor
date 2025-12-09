import { CrudRepository } from '../core/crud.repository';
import { Singleton } from '../core/singleton.mixin';
import { ICustomerRepository } from '../interfaces/customer.repository.interface';
import { Customer } from '../types/customer.types';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';

/**
 * Customer Repository Implementation
 * Handles all customer-related database operations
 */
class CustomerRepositoryBase extends CrudRepository<Customer, CreateCustomerData, UpdateCustomerData> implements ICustomerRepository {
  protected tableName = 'customers';
  protected idColumn = 'id';
  protected emailColumn = 'email';

  /**
   * Map database row to Customer entity
   */
  protected mapRow(row: any): Customer {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      city: row.city,
      state: row.state,
      zip: row.zip,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  /**
   * Create a new customer
   */
  async create(data: CreateCustomerData): Promise<Customer> {
    return await this.executeTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO ${this.tableName} (id, name, email, phone, address, city, state, zip, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
         RETURNING *`,
        [data.id, data.name, data.email, data.phone, data.address, data.city, data.state, data.zip]
      );

      return this.mapRow(result.rows[0]);
    });
  }
}

/**
 * Customer Repository with Singleton Pattern
 */
const CustomerRepository = Singleton(CustomerRepositoryBase);
type CustomerRepository = InstanceType<typeof CustomerRepository>;

export default CustomerRepository;

