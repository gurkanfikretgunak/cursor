# Architecture Documentation

## Overview

This service follows **Clean Architecture** principles with **Singleton Pattern** implementation, ensuring maintainability, testability, and scalability.

## Folder Structure

```
src/
├── core/                    # Core abstractions and base classes
│   └── base.repository.ts   # Base repository with common DB operations
├── interfaces/              # Contract definitions (interfaces)
│   ├── repository.interface.ts
│   ├── user.repository.interface.ts
│   ├── account.repository.interface.ts
│   ├── user.service.interface.ts
│   └── index.ts
├── dtos/                    # Data Transfer Objects
│   ├── user.dto.ts
│   ├── account.dto.ts
│   └── index.ts
├── types/                   # TypeScript type definitions
│   └── user.types.ts
├── repositories/            # Data Access Layer (Singleton)
│   ├── user.repository.ts
│   ├── account.repository.ts
│   └── index.ts            # Exports singleton instances
├── services/                # Business Logic Layer (Singleton)
│   ├── user.service.ts
│   └── index.ts            # Exports singleton instances
├── lib/                     # Infrastructure & utilities
│   ├── db.ts               # Database connection
│   └── auth.ts             # NextAuth configuration
├── routes/                   # API Route handlers
│   ├── auth.ts
│   ├── user.ts
│   └── health.ts
└── server.ts                # Fastify server setup
```

## Architecture Layers

### 1. **Interfaces Layer** (`interfaces/`)
- Defines contracts for all repositories and services
- Ensures abstraction and dependency inversion
- Enables easy mocking for testing

**Key Files:**
- `repository.interface.ts` - Base repository contract
- `user.repository.interface.ts` - User repository contract
- `account.repository.interface.ts` - Account repository contract
- `user.service.interface.ts` - User service contract

### 2. **DTOs Layer** (`dtos/`)
- Data Transfer Objects for input/output
- Separates domain models from API contracts
- Provides type safety for data flow

**Key Files:**
- `user.dto.ts` - User-related DTOs
- `account.dto.ts` - Account-related DTOs

### 3. **Core Layer** (`core/`)
- Base classes and shared abstractions
- Common functionality for repositories
- Transaction management

**Key Files:**
- `base.repository.ts` - Base repository with common DB operations

### 4. **Repositories Layer** (`repositories/`)
- Data access implementation
- **Singleton Pattern** - Single instance per application
- Implements repository interfaces
- Extends base repository for common operations

**Key Files:**
- `user.repository.ts` - User data access (Singleton)
- `account.repository.ts` - Account data access (Singleton)

**Usage:**
```typescript
import { userRepository } from '../repositories';
// Always returns the same instance
```

### 5. **Services Layer** (`services/`)
- Business logic implementation
- **Singleton Pattern** - Single instance per application
- Implements service interfaces
- Uses repositories via dependency injection

**Key Files:**
- `user.service.ts` - User business logic (Singleton)

**Usage:**
```typescript
import { userService } from '../services';
// Always returns the same instance
```

### 6. **Routes Layer** (`routes/`)
- API endpoint handlers
- Request/response handling
- Uses services for business logic

## Design Patterns

### Singleton Pattern

All repositories and services use the Singleton pattern:

```typescript
class UserRepository {
  private static instance: UserRepository;

  private constructor() {
    super();
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
}
```

**Benefits:**
- Single instance ensures consistency
- Reduces memory footprint
- Thread-safe in Node.js (single-threaded event loop)

### Dependency Injection

Services accept repository dependencies via constructor:

```typescript
class UserService {
  private constructor(
    userRepo?: IUserRepository,
    accountRepo?: IAccountRepository
  ) {
    this.userRepository = userRepo || userRepository;
    this.accountRepository = accountRepo || accountRepository;
  }
}
```

**Benefits:**
- Easy to mock for testing
- Loose coupling
- Flexible configuration

### Repository Pattern

All data access goes through repositories:

```typescript
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
}
```

**Benefits:**
- Separation of concerns
- Easy to swap data sources
- Centralized data access logic

## Data Flow

```
Request → Route → Service → Repository → Database
                ↓
            Business Logic
                ↓
            Validation
                ↓
            Error Handling
```

## Key Principles

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Dependency Inversion**: Depend on abstractions (interfaces), not concretions
3. **Single Responsibility**: Each class/module does one thing well
4. **DRY (Don't Repeat Yourself)**: Common functionality in base classes
5. **Type Safety**: Full TypeScript coverage with interfaces and types

## Testing Strategy

With this architecture, testing is straightforward:

1. **Unit Tests**: Mock interfaces, test services/repositories in isolation
2. **Integration Tests**: Test repository-database interactions
3. **E2E Tests**: Test full request-response cycle

Example:
```typescript
// Mock repository for service testing
const mockUserRepository: IUserRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  // ...
};

const userService = new UserService(mockUserRepository);
```

## Benefits

✅ **Maintainable**: Clear separation makes code easy to understand and modify  
✅ **Testable**: Interfaces enable easy mocking  
✅ **Scalable**: Easy to add new features without affecting existing code  
✅ **Type-Safe**: Full TypeScript coverage prevents runtime errors  
✅ **Consistent**: Singleton pattern ensures single source of truth  
✅ **Abstract**: Interfaces hide implementation details  


