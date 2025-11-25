import UserRepository from './user.repository';
import AccountRepository from './account.repository';
import CustomerRepository from './customer.repository';

/**
 * Repository exports with singleton instances
 */
export const userRepository = UserRepository.getInstance();
export const accountRepository = AccountRepository.getInstance();
export const customerRepository = CustomerRepository.getInstance();

export { UserRepository, AccountRepository, CustomerRepository };
