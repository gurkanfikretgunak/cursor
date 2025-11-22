import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getPool } from '../lib/db';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Check database connection
      const pool = getPool();
      await pool.query('SELECT 1');

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'auth-service',
        database: 'connected',
      };
    } catch (error) {
      reply.code(503);
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'auth-service',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

