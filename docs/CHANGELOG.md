# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-06

### Added
- Initial MVP authentication service setup
- User entity with BaseEntity inheritance
- User repository with data access methods
- Local authentication (email/username + password)
- JWT token generation (access + refresh tokens)
- Login endpoint with failed attempt tracking and account locking
- Register endpoint (public registration)
- Refresh token endpoint
- Logout endpoint (revokes refresh tokens)
- User profile endpoint (GET /users/profile)
- Update profile endpoint (PUT /users/profile)
- Account deactivation endpoint (DELETE /users/deactivate)
- Auth verification endpoint (GET /auth/verify)
- Common utilities (hash, JWT, validators, device fingerprint, cookies)
- Common guards (auth, refresh, app-id, optional-auth)
- Common interceptors (logging, error, transform)
- Global exception filter
- Custom decorators (current-user, current-session, app-id, public, private)
- Health check endpoint
- Feature flags for account locking, registration, deactivation

### Not Yet Implemented
- Multi-app context (appId integration in auth flow)
- Password reset functionality
- Email verification
- SMS verification
- Rate limiting
- OAuth providers (Google, GitHub, etc.)

## [Unreleased]

### Added
- Session Module (device tracking, session limit enforcement)
- Active session listing endpoint (GET /sessions)
- Session revocation endpoints (DELETE /sessions/:id, /sessions/others, /sessions)
- Strict session validation in AuthGuard (blocks revoked/expired sessions)
- Automatic cookie clearing for invalid or revoked sessions
- Cron Module with automated midnight cleanup for expired/revoked sessions
- Private registration endpoint (POST /auth/register-admin)

### Planned for Next Version
- App-based authentication context
- Password reset module
- Email service integration
- Session-based logout (logout current device vs all devices)