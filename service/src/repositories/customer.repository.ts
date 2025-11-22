import { BaseRepository } from '../core/base.repository';
import { ICustomerRepository } from '../interfaces/customer.repository.interface';
import { Customer } from '../types/customer.types';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';

/**
 * Customer Repository Implementation
 * Handles all customer-related database operations
 * Singleton Pattern
 */
class CustomerRepository extends BaseRepository implements ICustomerRepository {
  private static instance: CustomerRepository;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    super();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): CustomerRepository {
    if (!CustomerRepository.instance) {
      CustomerRepository.instance = new CustomerRepository();
    }
    return CustomerRepository.instance;
  }

  /**
   * Map database row to Customer entity
   */
  private mapCustomer(row: any): Customer {
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
   * Check if customer exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    const rows = await this.executeQuery<{ id: string }>(
      'SELECT id FROM customers WHERE email = $1 LIMIT 1',
      [email]
    );
    return rows.length > 0;
  }

  /**
   * Find customer by ID
   */
  async findById(customerId: string): Promise<Customer | null> {
    const rows = await this.executeQuery<any>(
      'SELECT * FROM customers WHERE id = $1',
      [customerId]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapCustomer(rows[0]);
  }

  /**
   * Find customer by email
   */
  async findByEmail(email: string): Promise<Customer | null> {
    const rows = await this.executeQuery<any>(
      'SELECT * FROM customers WHERE email = $1',
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapCustomer(rows[0]);
  }

  /**
   * Create a new customer
   */
  async create(data: CreateCustomerData): Promise<Customer> {
    return await this.executeTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO customers (id, name, email, phone, address, city, state, zip, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
         RETURNING *`,
        [data.id, data.name, data.email, data.phone, data.address, data.city, data.state, data.zip]
      );

      return this.mapCustomer(result.rows[0]);
    });
  }

  /**
   * Update customer
   */
  async update(customerId: string, data: UpdateCustomerData): Promise<Customer> {
    return await this.executeTransaction(async (client) => {
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (data.name !== undefined) {
        updateFields.push(`name = $${paramCount++}`);
        values.push(data.name);
      }

      if (data.email !== undefined) {
        updateFields.push(`email = $${paramCount++}`);
        values.push(data.email);
      }

      if (data.phone !== undefined) {
        updateFields.push(`phone = $${paramCount++}`);
        values.push(data.phone);
      }

      if (data.address !== undefined) {
        updateFields.push(`address = $${paramCount++}`);
        values.push(data.address);
      }

      if (data.city !== undefined) {
        updateFields.push(`city = $${paramCount++}`);
        values.push(data.city);
      }

      if (data.state !== undefined) {
        updateFields.push(`state = $${paramCount++}`);
        values.push(data.state);
      }

      if (data.zip !== undefined) {
        updateFields.push(`zip = $${paramCount++}`);
        values.push(data.zip);
      }

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      updateFields.push(`updated_at = NOW()`);
      values.push(customerId);

      const result = await client.query(
        `UPDATE customers 
         SET ${updateFields.join(', ')}
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        throw new Error('Customer not found');
      }

      return this.mapCustomer(result.rows[0]);
    });
  }
}

export default CustomerRepository;

