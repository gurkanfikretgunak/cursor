import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../services';

interface UpdateUserBody {
  name?: string;
  image?: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  // Get user by ID
  fastify.get<{ Params: { id: string } }>(
    '/users/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;

        const user = await userService.getUserById(id);

        if (!user) {
          reply.code(404);
          return { error: 'User not found' };
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (error) {
        reply.code(500);
        return {
          error: error instanceof Error ? error.message : 'Failed to get user',
        };
      }
    }
  );

  // Get user by email
  fastify.get<{ Querystring: { email: string } }>(
    '/users',
    async (request: FastifyRequest<{ Querystring: { email: string } }>, reply: FastifyReply) => {
      try {
        const { email } = request.query;

        if (!email) {
          reply.code(400);
          return { error: 'Email query parameter is required' };
        }

        const user = await userService.getUserByEmail(email);

        if (!user) {
          reply.code(404);
          return { error: 'User not found' };
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (error) {
        reply.code(500);
        return {
          error: error instanceof Error ? error.message : 'Failed to get user',
        };
      }
    }
  );

  // Update user profile
  fastify.patch<{ Params: { id: string }; Body: UpdateUserBody }>(
    '/users/:id',
    async (
      request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserBody }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        const updates = request.body;

        const user = await userService.updateUser(id, updates as { name?: string; image?: string });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (error) {
        reply.code(400);
        return {
          error: error instanceof Error ? error.message : 'Failed to update user',
        };
      }
    }
  );
}

