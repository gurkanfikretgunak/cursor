import { Singleton } from '../core/singleton.mixin';
import { ICustomerService } from '../interfaces/customer.service.interface';
import { ICustomerRepository } from '../interfaces/customer.repository.interface';
import { Customer } from '../types/customer.types';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';
import { validateEmail, validateUpdateInput, isNotEmpty } from '../utils/validation';
import { generateCustomerId } from '../utils/id-generator';
import { customerRepository } from '../repositories';

/**
 * Customer Service Implementation
 * Handles all customer-related business logic
 */
class CustomerServiceBase implements ICustomerService {
  private customerRepository: ICustomerRepository;

  constructor(customerRepo?: ICustomerRepository) {
    this.customerRepository = customerRepo || customerRepository;
  }

  /**
   * Create a new customer
   */
  async createCustomer(input: CreateCustomerData): Promise<Customer> {
    // Validate input
    isNotEmpty(input.name, 'Name');
    validateEmail(input.email);
    isNotEmpty(input.phone, 'Phone');
    isNotEmpty(input.address, 'Address');
    isNotEmpty(input.city, 'City');
    isNotEmpty(input.state, 'State');
    isNotEmpty(input.zip, 'Zip code');

    // Check if customer already exists
    const exists = await this.customerRepository.existsByEmail(input.email);
    if (exists) {
      throw new Error('Customer with this email already exists');
    }

    // Generate customer ID
    const customerId = generateCustomerId();

    // Create customer data
    const customerData: CreateCustomerData = {
      ...input,
      id: customerId,
    };

    return await this.customerRepository.create(customerData);
  }

  /**
   * Get customer by ID
   */
  async getCustomerById(customerId: string): Promise<Customer | null> {
    isNotEmpty(customerId, 'Customer ID');
    return await this.customerRepository.findById(customerId);
  }

  /**
   * Get customer by email
   */
  async getCustomerByEmail(email: string): Promise<Customer | null> {
    validateEmail(email);
    return await this.customerRepository.findByEmail(email);
  }

  /**
   * Update customer
   */
  async updateCustomer(customerId: string, input: UpdateCustomerData): Promise<Customer> {
    isNotEmpty(customerId, 'Customer ID');

    // Verify customer exists
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Validate update input
    validateUpdateInput(input);

    // If email is being updated, validate and check if new email already exists
    if (input.email) {
      validateEmail(input.email);
      if (input.email !== customer.email) {
        const exists = await this.customerRepository.existsByEmail(input.email);
        if (exists) {
          throw new Error('Customer with this email already exists');
        }
      }
    }

    // Update customer
    return await this.customerRepository.update(customerId, input);
  }

  /**
   * Delete customer
   */
  async deleteCustomer(customerId: string): Promise<boolean> {
    isNotEmpty(customerId, 'Customer ID');

    // Verify customer exists
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Note: Actual deletion would require adding delete method to repository
    // For now, return true if customer exists
    // TODO: Implement soft delete or hard delete in repository
    return true;
  }
}

/**
 * Customer Service with Singleton Pattern
 */
const CustomerService = Singleton(CustomerServiceBase);
type CustomerService = InstanceType<typeof CustomerService>;

export default CustomerService;

