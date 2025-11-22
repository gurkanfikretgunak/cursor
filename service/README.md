# Auth Service

A standalone Fastify microservice for user management with NextAuth.js integration.

## Features

- User registration and authentication
- OAuth providers: Google, GitHub
- Email/Password authentication
- User profile management
- PostgreSQL database integration
- TypeScript support

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

## Project Structure

```
service/
├── src/
│   ├── lib/
│   │   ├── db.ts          # Database connection and initialization
│   │   └── auth.ts         # NextAuth.js configuration
│   ├── routes/
│   │   ├── auth.ts         # Authentication routes
│   │   ├── user.ts         # User management routes
│   │   └── health.ts       # Health check route
│   ├── services/
│   │   └── user.service.ts # User business logic
│   ├── types/
│   │   └── user.types.ts   # TypeScript type definitions
│   └── server.ts           # Fastify server setup
├── package.json
├── tsconfig.json
└── README.md
```

## Database Schema

The service creates the following tables:

- `users` - User accounts
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verification_tokens` - Email verification tokens

## Integration with Next.js

This service is designed to work alongside a Next.js application. The web app can communicate with this service using the API client in `web/lib/api.ts`.

## License

MIT

