import UserService from './user.service';

/**
 * Service exports with singleton instances
 */
export const userService = UserService.getInstance();

export { UserService };
