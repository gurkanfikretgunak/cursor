/**
 * Shared ID generation utilities
 */

/**
 * Generate a unique ID with a prefix
 */
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate user ID
 */
export function generateUserId(): string {
  return generateId('user');
}

/**
 * Generate customer ID
 */
export function generateCustomerId(): string {
  return generateId('customer');
}

/**
 * Generate account ID
 */
export function generateAccountId(): string {
  return generateId('account');
}
