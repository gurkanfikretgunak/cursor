/**
 * API client for communicating with the auth service
 */

const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:4000';

export interface SignUpRequest {
  email: string;
  password: string;
  name?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = AUTH_SERVICE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Register a new user
   */
  async signUp(request: SignUpRequest): Promise<ApiResponse<{ user: Partial<User>; message: string }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Sign in with credentials
   */
  async signIn(request: SignInRequest): Promise<ApiResponse<{ message: string }>> {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Sign out
   */
  async signOut(): Promise<ApiResponse<{ message: string }>> {
    return this.request('/auth/signout', {
      method: 'POST',
    });
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${userId}`);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<ApiResponse<User>> {
    return this.request(`/users?email=${encodeURIComponent(email)}`);
  }

  /**
   * Update user profile
   */
  async updateUser(
    userId: string,
    updates: { name?: string; image?: string }
  ): Promise<ApiResponse<User>> {
    return this.request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<ApiResponse<{
    status: string;
    timestamp: string;
    service: string;
    database: string;
  }>> {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient();

