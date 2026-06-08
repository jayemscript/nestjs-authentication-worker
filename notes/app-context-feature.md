# App Context (appId) Feature Notes

## Purpose
Make the authentication service truly multi-app by enforcing an `appId` across the authentication flow. This allows a single centralized authentication service to securely manage identities, sessions, and access control for multiple distinct client applications (e.g., a NestJS Core API, a React Native Mobile App, a Web Dashboard).

## Key Changes & Architecture Required

### 1. Request Validation & Context Extraction
- **`AppIdGuard` ([app-id.guard.ts](../src/common/guards/app-id.guard.ts))**: 
  - Will intercept incoming requests and extract the application identifier (e.g., from an `x-app-id` custom header).
  - Validates that the provided `appId` is recognized and authorized to use the authentication service.
  - Rejects requests lacking a valid application context.
- **`AppIdDecorator` ([app-id.decorator.ts](../src/common/decorators/app-id.decorator.ts))**:
  - Provides a clean way to inject the validated `appId` directly into Controller route handlers.

### 2. JWT Payload Modifications
- **Auth Service ([auth.service.ts](../src/modules/auth/auth.service.ts))**:
  - The JWT payload generation must be updated to embed the `appId`.
  - **Security Benefit**: This ensures that an access token generated for the React Native app cannot be intercepted and maliciously used on the Web Dashboard (token scoping).

### 3. Session & Data Model Updates
- **Session Entity ([session.entity.ts](../src/modules/sessions/entities/session.entity.ts))**:
  - Add an `appId` column. A user can have multiple active sessions, but each session is now strictly bound to a specific device *and* a specific application.
- **User Access Validation**:
  - Update login logic to verify if the authenticating user actually has permissions to access the requesting `appId`.

### 4. Dynamic Authentication Rules (Per App)
- **Application Registry / Config**:
  - We need a mechanism (either environment variables, a config file, or an `Application` database table) to define app-specific rules.
  - Examples:
    - **React Native App**: Refresh tokens valid for 30 days, max 3 concurrent sessions.
    - **Admin Dashboard**: Refresh tokens valid for 8 hours, max 1 concurrent session, strict IP validation.

## Planned Testing Strategy
Once implemented, this architecture supports robust testing of real-world multi-app scenarios:
1. **React Native Flow**: Simulate a mobile login passing `x-app-id: mobile-client-123`. Verify the session is created with the correct app binding and long-lived token rules.
2. **Core API / Web Flow**: Simulate a web login passing `x-app-id: web-admin-456`. Verify short-lived token generation.
3. **Cross-Contamination Test**: Attempt to use the Mobile JWT to access a Web-only endpoint. The `AuthGuard` or `AppIdGuard` should detect the `appId` mismatch in the JWT payload and return `403 Forbidden`.

## References
- **Project Structure**: [FILE_STRUCTURE.md](../docs/FILE_STRUCTURE.md)
- **Current Guards**: [auth.guard.ts](../src/common/guards/auth.guard.ts)
- **Session Management**: [sessions.service.ts](../src/modules/sessions/sessions.service.ts)
