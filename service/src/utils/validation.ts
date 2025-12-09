/**
 * Shared validation utilities
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate that a string is not empty
 */
export function isNotEmpty(value: string | null | undefined, fieldName: string): void {
  if (!value || value.trim() === '') {
    throw new Error(`${fieldName} is required`);
  }
}

/**
 * Validate email format and throw if invalid
 */
export function validateEmail(email: string): void {
  isNotEmpty(email, 'Email');
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
}

/**
 * Validate that at least one field is provided in update input
 */
export function validateUpdateInput(input: Record<string, any>): void {
  if (Object.keys(input).length === 0) {
    throw new Error('At least one field must be provided for update');
  }
}

/**
 * Validate password requirements
 */
export function validatePassword(password: string): void {
  isNotEmpty(password, 'Password');
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
}
