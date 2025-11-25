import UserService from './user.service';
import CustomerService from './customer.service';

/**
 * Service exports with singleton instances
 */
export const userService = UserService.getInstance();
export const customerService = CustomerService.getInstance();

export { UserService, CustomerService };
