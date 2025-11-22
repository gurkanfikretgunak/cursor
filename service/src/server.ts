import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { initializeDatabase, closePool } from './lib/db';
import { healthRoutes } from './routes/health';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { customerRoutes } from './routes/customer';

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
});

// Register plugins
async function build() {
  // Security headers
  await server.register(helmet, {
    contentSecurityPolicy: false, // Adjust based on your needs
  });

  // CORS configuration
  await server.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Register routes
  await server.register(healthRoutes);
  await server.register(authRoutes);
  await server.register(userRoutes);
  await server.register(customerRoutes);

  // Root endpoint
  server.get('/', async () => {
    return {
      service: 'auth-service',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/health',
        auth: {
          signup: 'POST /auth/signup',
          signin: 'POST /auth/signin',
          signout: 'POST /auth/signout',
          session: 'GET /auth/session',
        },
        users: {
          getById: 'GET /users/:id',
          getByEmail: 'GET /users?email=...',
          update: 'PATCH /users/:id',
        },
        customers: {
          getById: 'GET /customers/:id',
          getByEmail: 'GET /customers?email=...',
          create: 'POST /customers',
          update: 'PATCH /customers/:id',
          delete: 'DELETE /customers/:id',
        },
      },
    };
  });
}

// Start server
async function start() {
  try {
    // Initialize database
    await initializeDatabase();

    // Build Fastify instance
    await build();

    // Start server
    const port = parseInt(process.env.PORT || '4000', 10);
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });

    server.log.info(`🚀 Auth service running on http://${host}:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  server.log.info('Shutting down gracefully...');
  await server.close();
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  server.log.info('Shutting down gracefully...');
  await server.close();
  await closePool();
  process.exit(0);
});

// Start the server
start();

