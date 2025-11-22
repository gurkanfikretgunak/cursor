import { Customer } from '../types/customer.types';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';

/**
 * Customer Service Interface
 * Defines contract for customer business logic operations
 */
export interface ICustomerService {
  createCustomer(input: CreateCustomerData): Promise<Customer>;
  getCustomerById(customerId: string): Promise<Customer | null>;
  getCustomerByEmail(email: string): Promise<Customer | null>;
  updateCustomer(customerId: string, input: UpdateCustomerData): Promise<Customer>;
  deleteCustomer(customerId: string): Promise<boolean>;
}

