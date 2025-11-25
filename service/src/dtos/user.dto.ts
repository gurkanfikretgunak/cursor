/**
 * Data Transfer Objects for User operations
 */

export interface CreateUserData {
  id: string;
  email: string;
  name: string | null;
}

export interface UpdateUserData {
  name?: string;
  image?: string;
}

export interface RegisterUserInput {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserInput {
  name?: string;
  image?: string;
}


