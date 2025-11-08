# Cursor Rules for Flutter Senior Engineer

## General Principles

- Write clean, maintainable, and scalable Flutter code
- Follow Flutter and Dart best practices
- Prioritize performance and user experience
- Write self-documenting code with meaningful names
- Keep functions small and focused (Single Responsibility Principle)
- Prefer composition over inheritance
- Use const constructors wherever possible for performance

## Code Style

### Naming Conventions
- Use `lowerCamelCase` for variables, parameters, and functions
- Use `UpperCamelCase` for classes, enums, and typedefs
- Use `lowercase_with_underscores` for file names
- Use `SCREAMING_CAPS` for constants
- Prefix private members with underscore `_`
- Use descriptive names: `userName` not `un`, `isLoading` not `loading`

### File Organization
- One class per file (except for related classes like models)
- Group related files in feature-based folders
- Use barrel exports (`export` statements) for public APIs
- Keep file sizes reasonable (< 300 lines when possible)

### Formatting
- Use `dart format` to format code
- Maximum line length: 80 characters (soft limit)
- Use trailing commas in multi-line lists/maps/constructors
- Prefer single quotes for strings (when consistent with team)

## Architecture Patterns

### State Management
- Use **Provider**, **Riverpod**, or **Bloc** for state management
- Keep business logic separate from UI
- Use immutable state objects
- Avoid setState in complex widgets; prefer state management solutions
- Use `Consumer` or `Selector` widgets to rebuild only necessary parts

### Project Structure
```
lib/
├── core/
│   ├── constants/
│   ├── errors/
│   ├── network/
│   ├── theme/
│   └── utils/
├── features/
│   └── feature_name/
│       ├── data/
│       │   ├── datasources/
│       │   ├── models/
│       │   └── repositories/
│       ├── domain/
│       │   ├── entities/
│       │   ├── repositories/
│       │   └── usecases/
│       └── presentation/
│           ├── bloc/ or providers/
│           ├── pages/
│           └── widgets/
├── shared/
│   ├── widgets/
│   └── utils/
└── main.dart
```

### Clean Architecture
- Follow Clean Architecture principles (Data, Domain, Presentation layers)
- Use dependency injection (get_it, riverpod, etc.)
- Implement repository pattern for data access
- Use use cases for business logic
- Keep presentation layer thin

## Widget Guidelines

### Stateless vs Stateful
- Prefer `StatelessWidget` unless state is needed
- Use `const` constructors for stateless widgets
- Extract stateful logic to separate widgets or state management

### Widget Composition
- Break down large widgets into smaller, reusable widgets
- Create custom widgets for repeated UI patterns
- Use `Builder` widget when context is needed in callbacks
- Prefer composition over deep widget trees

### Performance Optimization
- Use `const` widgets wherever possible
- Implement `ListView.builder` for long lists (not `ListView`)
- Use `RepaintBoundary` for expensive widgets
- Avoid rebuilding entire widget trees unnecessarily
- Use `keys` appropriately for state preservation

### Widget Best Practices
```dart
// Good: Const constructor
const Text('Hello')

// Good: Extracted widget
class UserCard extends StatelessWidget {
  final User user;
  const UserCard({required this.user});
  
  @override
  Widget build(BuildContext context) {
    return Card(/* ... */);
  }
}

// Avoid: Inline complex widgets
Widget build(BuildContext context) {
  return Column(
    children: [
      // 100+ lines of widget code
    ],
  );
}
```

## State Management

### Provider/Riverpod
- Use `Provider` for dependency injection
- Use `ChangeNotifier` for local state
- Use `FutureProvider`/`StreamProvider` for async data
- Use `Consumer` with `Selector` for granular rebuilds
- Keep providers close to where they're used

### BLoC Pattern
- One BLoC per feature/screen
- Use events for user actions
- Emit states, not UI widgets
- Handle errors in BLoC, not in UI
- Use `BlocBuilder`/`BlocListener` appropriately

## Error Handling

### Exception Handling
- Use custom exception classes
- Handle errors at appropriate layers
- Show user-friendly error messages
- Log errors for debugging
- Use `Result` or `Either` pattern for error handling

```dart
// Good: Custom exceptions
class NetworkException implements Exception {
  final String message;
  NetworkException(this.message);
}

// Good: Result pattern
sealed class Result<T> {
  const Result();
}

class Success<T> extends Result<T> {
  final T data;
  const Success(this.data);
}

class Failure<T> extends Result<T> {
  final Exception error;
  const Failure(this.error);
}
```

## Testing

### Unit Tests
- Write unit tests for business logic
- Test use cases and repositories
- Mock dependencies
- Aim for >80% code coverage on critical paths

### Widget Tests
- Test widget rendering
- Test user interactions
- Test state changes
- Use `pumpWidget` and `tester.pumpAndSettle()`

### Integration Tests
- Test critical user flows
- Test navigation
- Test API integration (with mocks)

## Performance

### Build Performance
- Use `const` constructors
- Avoid unnecessary rebuilds
- Use `RepaintBoundary` for expensive widgets
- Profile with Flutter DevTools

### Runtime Performance
- Use `ListView.builder` for lists
- Lazy load images
- Cache expensive computations
- Use `compute` for CPU-intensive tasks
- Optimize images (use appropriate formats and sizes)

### Memory Management
- Dispose controllers and streams
- Avoid memory leaks (use `dispose()` properly)
- Use weak references when appropriate
- Profile memory usage

## Navigation

### Routing
- Use `go_router` or `auto_route` for type-safe routing
- Define routes in a centralized location
- Use named routes or route classes
- Handle deep linking properly

### Navigation Best Practices
```dart
// Good: Type-safe navigation
context.go('/users/${userId}');

// Good: Named routes
Navigator.pushNamed(context, '/user-details', arguments: userId);

// Avoid: String-based navigation without structure
Navigator.push(context, MaterialPageRoute(builder: (_) => UserPage()));
```

## Networking

### API Calls
- Use `dio` or `http` package
- Implement interceptors for logging/auth
- Handle timeouts and retries
- Use models for API responses (json_serializable)
- Implement proper error handling

### API Structure
```dart
// Good: Repository pattern
abstract class UserRepository {
  Future<Result<User>> getUser(String id);
}

class UserRepositoryImpl implements UserRepository {
  final ApiClient apiClient;
  
  @override
  Future<Result<User>> getUser(String id) async {
    try {
      final response = await apiClient.get('/users/$id');
      return Success(User.fromJson(response));
    } catch (e) {
      return Failure(NetworkException(e.toString()));
    }
  }
}
```

## Local Storage

### Data Persistence
- Use `shared_preferences` for simple key-value storage
- Use `sqflite`/`hive`/`isar` for complex data
- Use `flutter_secure_storage` for sensitive data
- Implement proper data migration strategies

## UI/UX Guidelines

### Material Design
- Follow Material Design 3 guidelines
- Use theme for consistent styling
- Support light/dark mode
- Ensure accessibility (semantics, contrast)

### Responsive Design
- Support multiple screen sizes
- Use `LayoutBuilder` or `MediaQuery`
- Test on different devices
- Consider tablet layouts

### Animations
- Use `AnimatedContainer`, `AnimatedOpacity`, etc. for simple animations
- Use `AnimationController` for complex animations
- Keep animations smooth (60fps)
- Respect `prefers-reduced-motion` accessibility setting

## Code Quality

### Documentation
- Document public APIs
- Use `///` for documentation comments
- Write clear, concise comments
- Explain "why", not "what"

### Code Reviews
- Review for performance implications
- Check error handling
- Verify test coverage
- Ensure accessibility
- Check for security issues

### Dependencies
- Keep dependencies up to date
- Use `dependency_validator` to check for unused dependencies
- Prefer well-maintained packages
- Document why specific packages are chosen

## Security

### Best Practices
- Never commit API keys or secrets
- Use environment variables for configuration
- Validate and sanitize user input
- Use secure storage for sensitive data
- Implement proper authentication/authorization
- Use HTTPS for all network requests

## Accessibility

### Requirements
- Add semantic labels to widgets
- Ensure sufficient color contrast
- Support screen readers
- Make touch targets at least 48x48 pixels
- Test with accessibility tools

```dart
// Good: Accessible widget
Semantics(
  label: 'Submit button',
  button: true,
  child: ElevatedButton(
    onPressed: () {},
    child: Text('Submit'),
  ),
)
```

## Platform-Specific Code

### Platform Channels
- Use `MethodChannel` for platform-specific code
- Keep platform code minimal
- Document platform-specific behavior
- Handle platform exceptions

### Platform Checks
```dart
// Good: Platform-specific code
if (Platform.isIOS) {
  // iOS-specific code
} else if (Platform.isAndroid) {
  // Android-specific code
}
```

## Common Patterns

### Loading States
```dart
// Good: Clear loading state handling
sealed class DataState<T> {
  const DataState();
}

class Loading<T> extends DataState<T> {}
class Success<T> extends DataState<T> {
  final T data;
  Success(this.data);
}
class Error<T> extends DataState<T> {
  final String message;
  Error(this.message);
}
```

### Form Handling
- Use `TextEditingController` or form packages
- Validate input properly
- Show clear error messages
- Handle form submission states

## When Writing Code

1. **Think before coding**: Plan the architecture and data flow
2. **Write tests**: Write tests alongside or before implementation
3. **Refactor**: Continuously improve code quality
4. **Profile**: Use Flutter DevTools to identify bottlenecks
5. **Document**: Document complex logic and public APIs
6. **Review**: Self-review code before committing

## Code Generation

- Use `build_runner` for code generation (json_serializable, freezed, etc.)
- Regenerate code when models change
- Commit generated files or add to `.gitignore` (team decision)
- Document code generation commands

## Version Control

- Write meaningful commit messages (follow semantic commits)
- Keep commits focused and atomic
- Use feature branches
- Write descriptive PR descriptions

## Continuous Improvement

- Stay updated with Flutter releases
- Learn new patterns and best practices
- Refactor legacy code when possible
- Share knowledge with the team
- Contribute to open source Flutter packages

---

**Remember**: Code is read more often than written. Write code that your future self and teammates will thank you for.

