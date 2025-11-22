import { PoolClient } from 'pg';
import { getPool } from '../lib/db';


/**
 * Base Repository Class
 * Provides common database operations and connection management
 */
export abstract class BaseRepository {
  /**
   * Get database client connection
   */
  protected async getClient(): Promise<PoolClient> {
    const pool = getPool();
    return await pool.connect();
  }

  /**
   * Execute a transaction
   */
  protected async executeTransaction<T>(
    callback: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Execute a query with automatic connection management
   */
  protected async executeQuery<T>(
    query: string,
    params: any[] = []
  ): Promise<T[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}


