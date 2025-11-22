/**
 * Base repository interface
 * All repositories should implement this interface
 */
export interface IRepository<T, CreateInput, UpdateInput> {
  findById(id: string): Promise<T | null>;
  create(data: CreateInput): Promise<T>;
  update(id: string, data: UpdateInput): Promise<T>;
}


