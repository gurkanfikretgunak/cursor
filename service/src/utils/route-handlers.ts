import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Generic route handler utilities to reduce code duplication
 */

/**
 * Handle GET by ID route
 */
export async function handleGetById<T>(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
  serviceMethod: (id: string) => Promise<T | null>,
  entityName: string
): Promise<any> {
  try {
    const { id } = request.params;
    const entity = await serviceMethod(id);

    if (!entity) {
      reply.code(404);
      return { error: `${entityName} not found` };
    }

    return entity;
  } catch (error) {
    reply.code(500);
    return {
      error: error instanceof Error ? error.message : `Failed to get ${entityName.toLowerCase()}`,
    };
  }
}

/**
 * Handle GET by email route
 */
export async function handleGetByEmail<T>(
  request: FastifyRequest<{ Querystring: { email: string } }>,
  reply: FastifyReply,
  serviceMethod: (email: string) => Promise<T | null>,
  entityName: string
): Promise<any> {
  try {
    const { email } = request.query;

    if (!email) {
      reply.code(400);
      return { error: 'Email query parameter is required' };
    }

    const entity = await serviceMethod(email);

    if (!entity) {
      reply.code(404);
      return { error: `${entityName} not found` };
    }

    return entity;
  } catch (error) {
    reply.code(500);
    return {
      error: error instanceof Error ? error.message : `Failed to get ${entityName.toLowerCase()}`,
    };
  }
}

/**
 * Handle POST (create) route
 */
export async function handleCreate<T, CreateInput>(
  request: FastifyRequest<{ Body: CreateInput }>,
  reply: FastifyReply,
  serviceMethod: (data: CreateInput) => Promise<T>,
  entityName: string
): Promise<any> {
  try {
    const data = request.body;
    const entity = await serviceMethod(data);

    reply.code(201);
    return {
      message: `${entityName} created successfully`,
      [entityName.toLowerCase()]: entity,
    };
  } catch (error) {
    reply.code(400);
    return {
      error: error instanceof Error ? error.message : `Failed to create ${entityName.toLowerCase()}`,
    };
  }
}

/**
 * Handle PATCH (update) route
 */
export async function handleUpdate<T, UpdateInput>(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateInput }>,
  reply: FastifyReply,
  serviceMethod: (id: string, data: UpdateInput) => Promise<T>,
  entityName: string
): Promise<any> {
  try {
    const { id } = request.params;
    const updates = request.body;
    const entity = await serviceMethod(id, updates);

    return entity;
  } catch (error) {
    reply.code(400);
    return {
      error: error instanceof Error ? error.message : `Failed to update ${entityName.toLowerCase()}`,
    };
  }
}

/**
 * Handle DELETE route
 */
export async function handleDelete(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
  serviceMethod: (id: string) => Promise<boolean>,
  entityName: string
): Promise<any> {
  try {
    const { id } = request.params;
    const deleted = await serviceMethod(id);

    if (!deleted) {
      reply.code(404);
      return { error: `${entityName} not found` };
    }

    return {
      message: `${entityName} deleted successfully`,
    };
  } catch (error) {
    reply.code(400);
    return {
      error: error instanceof Error ? error.message : `Failed to delete ${entityName.toLowerCase()}`,
    };
  }
}
