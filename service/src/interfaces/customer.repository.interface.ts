import { Customer } from '../types/customer.types';
import { IRepository } from './repository.interface';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';

/**
 * Customer Repository Interface
 * Defines contract for customer data access operations
 */
export interface ICustomerRepository extends IRepository<Customer, CreateCustomerData, UpdateCustomerData> {
  existsByEmail(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<Customer | null>;
}

