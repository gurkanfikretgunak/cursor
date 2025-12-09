import { FastifyInstance } from 'fastify';
import { customerService } from '../services';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';
import { handleGetById, handleGetByEmail, handleCreate, handleUpdate, handleDelete } from '../utils/route-handlers';

export async function customerRoutes(fastify: FastifyInstance) {
  // Get customer by ID
  fastify.get<{ Params: { id: string } }>(
    '/customers/:id',
    async (request, reply) => {
      return handleGetById(request, reply, (id) => customerService.getCustomerById(id), 'Customer');
    }
  );

  // Get customer by email
  fastify.get<{ Querystring: { email: string } }>(
    '/customers',
    async (request, reply) => {
      return handleGetByEmail(request, reply, (email) => customerService.getCustomerByEmail(email), 'Customer');
    }
  );

  // Create new customer
  fastify.post<{ Body: CreateCustomerData }>(
    '/customers',
    async (request, reply) => {
      return handleCreate(request, reply, (data) => customerService.createCustomer(data), 'Customer');
    }
  );

  // Update customer
  fastify.patch<{ Params: { id: string }; Body: UpdateCustomerData }>(
    '/customers/:id',
    async (request, reply) => {
      return handleUpdate(request, reply, (id, data) => customerService.updateCustomer(id, data), 'Customer');
    }
  );

  // Delete customer
  fastify.delete<{ Params: { id: string } }>(
    '/customers/:id',
    async (request, reply) => {
      return handleDelete(request, reply, (id) => customerService.deleteCustomer(id), 'Customer');
    }
  );
}

