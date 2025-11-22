/**
 * Data Transfer Objects for Account operations
 */

export interface CreateAccountData {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  passwordHash?: string;
}


