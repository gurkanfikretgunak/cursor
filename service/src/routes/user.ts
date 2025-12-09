import { FastifyInstance } from 'fastify';
import { userService } from '../services';
import { handleGetById, handleGetByEmail, handleUpdate } from '../utils/route-handlers';

interface UpdateUserBody {
  name?: string;
  image?: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  // Get user by ID
  fastify.get<{ Params: { id: string } }>(
    '/users/:id',
    async (request, reply) => {
      return handleGetById(request, reply, (id) => userService.getUserById(id), 'User');
    }
  );

  // Get user by email
  fastify.get<{ Querystring: { email: string } }>(
    '/users',
    async (request, reply) => {
      return handleGetByEmail(request, reply, (email) => userService.getUserByEmail(email), 'User');
    }
  );

  // Update user profile
  fastify.patch<{ Params: { id: string }; Body: UpdateUserBody }>(
    '/users/:id',
    async (request, reply) => {
      return handleUpdate(
        request,
        reply,
        (id, data) => userService.updateUser(id, data as { name?: string; image?: string }),
        'User'
      );
    }
  );
}

