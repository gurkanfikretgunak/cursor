import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../services';

interface SignUpBody {
  email: string;
  password: string;
  name?: string;
}

interface SignInBody {
  email: string;
  password: string;
}

export async function authRoutes(fastify: FastifyInstance) {
  // Register new user
  fastify.post<{ Body: SignUpBody }>(
    '/auth/signup',
    async (request: FastifyRequest<{ Body: SignUpBody }>, reply: FastifyReply) => {
      try {
        const { email, password, name } = request.body;

        if (!email || !password) {
          reply.code(400);
          return { error: 'Email and password are required' };
        }

        const user = await userService.registerUser({ email, password, name });

        reply.code(201);
        return {
          message: 'User created successfully',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
      } catch (error) {
        reply.code(400);
        return {
          error: error instanceof Error ? error.message : 'Failed to create user',
        };
      }
    }
  );

  // Sign in with credentials
  fastify.post<{ Body: SignInBody }>(
    '/auth/signin',
    async (request: FastifyRequest<{ Body: SignInBody }>, reply: FastifyReply) => {
      try {
        const { email, password } = request.body;

        if (!email || !password) {
          reply.code(400);
          return { error: 'Email and password are required' };
        }

        // This will be handled by NextAuth.js credentials provider
        // For now, return a message indicating they should use the NextAuth endpoint
        reply.code(200);
        return {
          message: 'Please use NextAuth.js endpoints for authentication',
          endpoints: {
            signin: '/api/auth/signin',
            callback: '/api/auth/callback/:provider',
          },
        };
      } catch (error) {
        reply.code(401);
        return {
          error: error instanceof Error ? error.message : 'Authentication failed',
        };
      }
    }
  );

  // Get current session (if using NextAuth.js session)
  fastify.get('/auth/session', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      // This would typically be handled by NextAuth.js
      // For Fastify integration, you'd need to extract session from cookies/headers
      reply.code(200);
      return {
        message: 'Session endpoint - integrate with NextAuth.js session handling',
      };
    } catch (error) {
      reply.code(401);
      return {
        error: 'Not authenticated',
      };
    }
  });

  // Sign out
  fastify.post('/auth/signout', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Clear session/cookies
      reply.code(200);
      return {
        message: 'Signed out successfully',
      };
    } catch (error) {
      reply.code(500);
      return {
        error: 'Failed to sign out',
      };
    }
  });
}

