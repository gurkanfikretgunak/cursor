import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { customerService } from '../services';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';

export async function customerRoutes(fastify: FastifyInstance) {
  // Get customer by ID
  fastify.get<{ Params: { id: string } }>(
    '/customers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;

        const customer = await customerService.getCustomerById(id);

        if (!customer) {
          reply.code(404);
          return { error: 'Customer not found' };
        }

        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        };
      } catch (error) {
        reply.code(500);
        return {
          error: error instanceof Error ? error.message : 'Failed to get customer',
        };
      }
    }
  );

  // Get customer by email
  fastify.get<{ Querystring: { email: string } }>(
    '/customers',
    async (request: FastifyRequest<{ Querystring: { email: string } }>, reply: FastifyReply) => {
      try {
        const { email } = request.query;

        if (!email) {
          reply.code(400);
          return { error: 'Email query parameter is required' };
        }

        const customer = await customerService.getCustomerByEmail(email);

        if (!customer) {
          reply.code(404);
          return { error: 'Customer not found' };
        }

        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        };
      } catch (error) {
        reply.code(500);
        return {
          error: error instanceof Error ? error.message : 'Failed to get customer',
        };
      }
    }
  );

  // Create new customer
  fastify.post<{ Body: CreateCustomerData }>(
    '/customers',
    async (request: FastifyRequest<{ Body: CreateCustomerData }>, reply: FastifyReply) => {
      try {
        const customerData = request.body;

        const customer = await customerService.createCustomer(customerData);

        reply.code(201);
        return {
          message: 'Customer created successfully',
          customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
          },
        };
      } catch (error) {
        reply.code(400);
        return {
          error: error instanceof Error ? error.message : 'Failed to create customer',
        };
      }
    }
  );

  // Update customer
  fastify.patch<{ Params: { id: string }; Body: UpdateCustomerData }>(
    '/customers/:id',
    async (
      request: FastifyRequest<{ Params: { id: string }; Body: UpdateCustomerData }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        const updates = request.body;

        const customer = await customerService.updateCustomer(id, updates);

        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        };
      } catch (error) {
        reply.code(400);
        return {
          error: error instanceof Error ? error.message : 'Failed to update customer',
        };
      }
    }
  );

  // Delete customer
  fastify.delete<{ Params: { id: string } }>(
    '/customers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;

        const deleted = await customerService.deleteCustomer(id);

        if (!deleted) {
          reply.code(404);
          return { error: 'Customer not found' };
        }

        return {
          message: 'Customer deleted successfully',
        };
      } catch (error) {
        reply.code(400);
        return {
          error: error instanceof Error ? error.message : 'Failed to delete customer',
        };
      }
    }
  );
}

