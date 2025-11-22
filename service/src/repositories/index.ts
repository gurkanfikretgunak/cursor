import UserRepository from './user.repository';
import AccountRepository from './account.repository';

/**
 * Repository exports with singleton instances
 */
export const userRepository = UserRepository.getInstance();
export const accountRepository = AccountRepository.getInstance();

export { UserRepository, AccountRepository };
