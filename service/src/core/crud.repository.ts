import { PoolClient } from 'pg';
import { BaseRepository } from './base.repository';

/**
 * Generic CRUD Repository Base Class
 * Provides common CRUD operations that can be reused across repositories
 */
export abstract class CrudRepository<T, CreateInput, UpdateInput> extends BaseRepository {
  protected abstract tableName: string;
  protected abstract idColumn: string;
  protected abstract emailColumn?: string;
  protected abstract mapRow(row: any): T;

  /**
   * Find entity by ID
   */
  async findById(id: string): Promise<T | null> {
    const rows = await this.executeQuery<any>(
      `SELECT * FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapRow(rows[0]);
  }

  /**
   * Find entity by email (if email column is defined)
   */
  async findByEmail(email: string): Promise<T | null> {
    if (!this.emailColumn) {
      throw new Error('Email column not defined for this repository');
    }

    const rows = await this.executeQuery<any>(
      `SELECT * FROM ${this.tableName} WHERE ${this.emailColumn} = $1`,
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapRow(rows[0]);
  }

  /**
   * Check if entity exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    if (!this.emailColumn) {
      throw new Error('Email column not defined for this repository');
    }

    const rows = await this.executeQuery<{ id: string }>(
      `SELECT ${this.idColumn} FROM ${this.tableName} WHERE ${this.emailColumn} = $1 LIMIT 1`,
      [email]
    );
    return rows.length > 0;
  }

  /**
   * Generic update method that builds dynamic UPDATE query
   */
  async update(id: string, data: UpdateInput): Promise<T> {
    return await this.executeTransaction(async (client) => {
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      // Build update fields dynamically
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          const dbColumn = this.camelToSnakeCase(key);
          updateFields.push(`${dbColumn} = $${paramCount++}`);
          values.push(value);
        }
      }

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      // Always update updated_at timestamp
      updateFields.push(`updated_at = NOW()`);
      values.push(id);

      const result = await client.query(
        `UPDATE ${this.tableName} 
         SET ${updateFields.join(', ')}
         WHERE ${this.idColumn} = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        throw new Error(`${this.getEntityName()} not found`);
      }

      return this.mapRow(result.rows[0]);
    });
  }

  /**
   * Convert camelCase to snake_case for database column names
   */
  protected camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  /**
   * Get entity name for error messages
   */
  protected getEntityName(): string {
    return this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1, -1);
  }
}
