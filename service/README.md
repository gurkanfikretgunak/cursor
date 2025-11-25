# Auth Service

A standalone Fastify microservice for user management with NextAuth.js integration.

## Features

- User registration and authentication
- OAuth providers: Google, GitHub
- Email/Password authentication
- User profile management
- Customer management (CRUD operations)
- PostgreSQL database integration
- TypeScript support
- Clean Architecture with Singleton Pattern

## Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OAuth app credentials (Google, GitHub)

### Installation

```bash
cd service
npm install
```

### Environment Variables

Create a `.env` file in the `service/` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Server
PORT=4000
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:4000

# NextAuth.js
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:4000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Database Setup

The service will automatically create the required tables on startup. Make sure your PostgreSQL database is running and accessible.

### Running the Service

Development:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Service health status

### Authentication
- `POST /auth/signup` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /auth/signin` - Sign in with credentials
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/signout` - Sign out
- `GET /auth/session` - Get current session

### Users
- `GET /users/:id` - Get user by ID
- `GET /users?email=...` - Get user by email
- `PATCH /users/:id` - Update user profile
  ```json
  {
    "name": "Updated Name",
    "image": "https://example.com/avatar.jpg"
  }
  ```

### Customers
- `GET /customers/:id` - Get customer by ID
- `GET /customers?email=...` - Get customer by email
- `POST /customers` - Create new customer
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
  ```
- `PATCH /customers/:id` - Update customer
  ```json
  {
    "name": "Updated Name",
    "phone": "+1234567890"
  }
  ```
- `DELETE /customers/:id` - Delete customer

## Project Structure

```
service/
├── src/
│   ├── core/                    # Base classes and abstractions
│   │   └── base.repository.ts   # Base repository with common DB operations
│   ├── interfaces/              # Contract definitions (interfaces)
│   │   ├── repository.interface.ts
│   │   ├── user.repository.interface.ts
│   │   ├── account.repository.interface.ts
│   │   ├── customer.repository.interface.ts
│   │   ├── user.service.interface.ts
│   │   ├── customer.service.interface.ts
│   │   └── index.ts
│   ├── dtos/                    # Data Transfer Objects
│   │   ├── user.dto.ts
│   │   ├── account.dto.ts
│   │   ├── customer.dto.ts
│   │   └── index.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── user.types.ts
│   │   └── customer.types.ts
│   ├── repositories/            # Data Access Layer (Singleton)
│   │   ├── user.repository.ts
│   │   ├── account.repository.ts
│   │   ├── customer.repository.ts
│   │   └── index.ts            # Exports singleton instances
│   ├── services/                # Business Logic Layer (Singleton)
│   │   ├── user.service.ts
│   │   ├── customer.service.ts
│   │   └── index.ts            # Exports singleton instances
│   ├── lib/                     # Infrastructure & utilities
│   │   ├── db.ts               # Database connection and initialization
│   │   └── auth.ts             # NextAuth.js configuration
│   ├── routes/                  # API Route handlers
│   │   ├── auth.ts             # Authentication routes
│   │   ├── user.ts             # User management routes
│   │   ├── customer.ts         # Customer management routes
│   │   └── health.ts           # Health check route
│   └── server.ts                # Fastify server setup
├── package.json
├── tsconfig.json
├── .gitignore
├── .env.example
├── ARCHITECTURE.md
└── README.md
```

## Database Schema

The service creates the following tables:

- `users` - User accounts
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verification_tokens` - Email verification tokens
- `customers` - Customer records

## Integration with Next.js

This service is designed to work alongside a Next.js application. The web app can communicate with this service using the API client in `web/lib/api.ts`.

## License

MIT

