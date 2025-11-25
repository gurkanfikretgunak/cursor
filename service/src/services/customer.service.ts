import { ICustomerService } from '../interfaces/customer.service.interface';
import { ICustomerRepository } from '../interfaces/customer.repository.interface';
import { Customer } from '../types/customer.types';
import { CreateCustomerData, UpdateCustomerData } from '../dtos/customer.dto';
import { customerRepository } from '../repositories';

/**
 * Customer Service Implementation
 * Handles all customer-related business logic
 * Singleton Pattern
 */
class CustomerService implements ICustomerService {
  private static instance: CustomerService;
  private customerRepository: ICustomerRepository;

  /**
   * Private constructor for singleton pattern
   */
  private constructor(customerRepo?: ICustomerRepository) {
    this.customerRepository = customerRepo || customerRepository;
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  /**
   * Create a new customer
   */
  async createCustomer(input: CreateCustomerData): Promise<Customer> {
    // Validate input
    this.validateCreateInput(input);

    // Check if customer already exists
    const exists = await this.customerRepository.existsByEmail(input.email);
    if (exists) {
      throw new Error('Customer with this email already exists');
    }

    // Generate customer ID
    const customerId = this.generateCustomerId();

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
    if (!customerId || customerId.trim() === '') {
      throw new Error('Customer ID is required');
    }

    return await this.customerRepository.findById(customerId);
  }

  /**
   * Get customer by email
   */
  async getCustomerByEmail(email: string): Promise<Customer | null> {
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    return await this.customerRepository.findByEmail(email);
  }

  /**
   * Update customer
   */
  async updateCustomer(customerId: string, input: UpdateCustomerData): Promise<Customer> {
    if (!customerId || customerId.trim() === '') {
      throw new Error('Customer ID is required');
    }

    // Verify customer exists
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Validate update input
    this.validateUpdateInput(input);

    // If email is being updated, check if new email already exists
    if (input.email && input.email !== customer.email) {
      const exists = await this.customerRepository.existsByEmail(input.email);
      if (exists) {
        throw new Error('Customer with this email already exists');
      }
    }

    // Update customer
    return await this.customerRepository.update(customerId, input);
  }

  /**
   * Delete customer
   */
  async deleteCustomer(customerId: string): Promise<boolean> {
    if (!customerId || customerId.trim() === '') {
      throw new Error('Customer ID is required');
    }

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

  /**
   * Generate unique customer ID
   */
  private generateCustomerId(): string {
    return `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate create input
   */
  private validateCreateInput(input: CreateCustomerData): void {
    if (!input.name || input.name.trim() === '') {
      throw new Error('Name is required');
    }

    if (!input.email || input.email.trim() === '') {
      throw new Error('Email is required');
    }

    if (!this.isValidEmail(input.email)) {
      throw new Error('Invalid email format');
    }

    if (!input.phone || input.phone.trim() === '') {
      throw new Error('Phone is required');
    }

    if (!input.address || input.address.trim() === '') {
      throw new Error('Address is required');
    }

    if (!input.city || input.city.trim() === '') {
      throw new Error('City is required');
    }

    if (!input.state || input.state.trim() === '') {
      throw new Error('State is required');
    }

    if (!input.zip || input.zip.trim() === '') {
      throw new Error('Zip code is required');
    }
  }

  /**
   * Validate update input
   */
  private validateUpdateInput(input: UpdateCustomerData): void {
    if (Object.keys(input).length === 0) {
      throw new Error('At least one field must be provided for update');
    }

    if (input.email && !this.isValidEmail(input.email)) {
      throw new Error('Invalid email format');
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default CustomerService;

