feat(auth): implement user management service with NextAuth.js and Fastify

Add comprehensive authentication and user management system with enterprise-level architecture.

Service Layer:
- Create standalone Fastify microservice on port 4000
- Implement NextAuth.js integration with Google, GitHub, and Email/Password providers
- Set up PostgreSQL database with automatic schema initialization
- Create modular architecture following Clean Architecture principles:
  * Interfaces layer for contracts and abstractions
  * DTOs layer for data transfer objects
  * Repositories layer with singleton pattern for data access
  * Services layer with singleton pattern for business logic
  * Base repository class for common database operations
- Implement singleton pattern across all repositories and services
- Add comprehensive API routes for authentication and user management
- Include health check endpoint for service monitoring
- Add TypeScript configuration and build setup
- Create comprehensive .gitignore for Node.js/TypeScript project

Web Layer:
- Set up shadcn/ui component library
- Configure Tailwind CSS with custom theme variables
- Create reusable UI components (Button, Input, Card, Form, Dialog, Label)
- Add authentication-specific components (AuthForm, OAuthButtons, UserMenu)
- Implement API client for communicating with auth service
- Add utility functions for className merging (cn utility)
- Update global CSS with Tailwind directives and shadcn variables

Architecture:
- Follow Clean Architecture with clear separation of concerns
- Implement Dependency Injection pattern
- Use Repository Pattern for data access abstraction
- Singleton pattern ensures single instance per service/repository
- Full TypeScript coverage with interfaces and type definitions
- Comprehensive error handling and input validation

Documentation:
- Add ARCHITECTURE.md documenting the system design
- Update README.md with setup instructions
- Include API endpoint documentation

This implementation provides a production-ready authentication system that can be easily extended and maintained.

