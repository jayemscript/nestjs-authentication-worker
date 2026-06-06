# Next Steps & Remaining Features

## Current Status
MVP authentication service is complete and tested. All core endpoints working:
- Register, Login, Refresh, Logout
- User Profile, Update Profile, Deactivate Account
- Auth Verification

## Next Priority Features (In Order)

### 1. Session Module (High Priority)
**Purpose**: Track user sessions per device, allow logout per device or all devices

**Files to Create**:
- `src/modules/sessions/session.entity.ts` - session data model
- `src/modules/sessions/session.repository.ts`
- `src/modules/sessions/sessions.service.ts`
- `src/modules/sessions/sessions.controller.ts`
- `src/modules/sessions/dtos/` - session DTOs
- `src/modules/sessions/sessions.module.ts`

**Features**:
- Create session on login (store device info, fingerprint, IP)
- Get all active sessions for user
- Revoke specific session (logout current device)
- Revoke all sessions (logout all devices)
- Update last activity timestamp
- Delete expired sessions

**Database Migration**:
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY,
  device_fingerprint VARCHAR,
  device_type ENUM,
  ip_address VARCHAR,
  user_agent TEXT,
  created_at TIMESTAMP,
  last_activity_at TIMESTAMP,
  expires_at TIMESTAMP,
  status ENUM (active, revoked, expired)
)
```

### 2. App Context Integration (High Priority)
**Purpose**: Make auth service truly multi-app by enforcing appId

**Changes Required**:
- Add AppIdGuard to auth endpoints
- Store appId with user login
- Validate user access per app
- Different auth rules per app (if needed)
- Store app context in JWT

### 3. Password Reset Module (Medium Priority)
**Purpose**: Allow users to reset forgotten passwords

**Files to Create**:
- `src/modules/password-reset/password-reset.entity.ts`
- `src/modules/password-reset/password-reset.repository.ts`
- `src/modules/password-reset/password-reset.service.ts`
- `src/modules/password-reset/password-reset.controller.ts`
- `src/modules/password-reset/dtos/`
- `src/modules/password-reset/password-reset.module.ts`

**Endpoints**:
- POST /password-reset/request - request reset (send email)
- POST /password-reset/confirm - confirm with token + new password

**Note**: Requires email service integration

### 4. Email Service Integration (Medium Priority)
**Purpose**: Send verification emails, password reset links

**Integration Points**:
- Call separate email microservice
- Handle email verification (optional, flag: FEATURE_EMAIL_OTP)
- Password reset emails

### 5. Rate Limiting (Low Priority)
**Purpose**: Prevent brute force attacks

**Status**: Code already in app.module.ts (commented out)
**To Enable**: Uncomment ThrottlerModule in app.module.ts

## Database Migrations to Create

1. ✅ Users table (DONE)
2. Sessions table (TODO - for Session module)
3. Password reset tokens table (TODO - for Password Reset module)

## Configuration Checklist for Production

- [ ] Change all COOKIE_SECRET and JWT_SECRET to strong random values
- [ ] Set NODE_ENV=production
- [ ] Enable DB_SSL=true
- [ ] Set COOKIE_SECURE=true
- [ ] Update CORS_ORIGINS to actual domains
- [ ] Enable API_KEY_REQUIRED=true
- [ ] Set LOG_LEVEL=log (remove debug)
- [ ] Configure Redis for production
- [ ] Setup email service endpoint
- [ ] Enable rate limiting if needed

## Architecture Notes

- Auth service remains app-agnostic (doesn't know business logic)
- Sessions module will handle device-specific logout
- RBAC will be separate service (nestjs-rbac-worker)
- Email service will be separate microservice
- Each module is independently testable and deployable

## Testing TODOs

- [ ] Create unit tests for auth.service
- [ ] Create integration tests for auth endpoints
- [ ] Create tests for password hashing/validation
- [ ] Create tests for JWT generation
- [ ] E2E tests for complete auth flow

## Documentation TODOs

- [ ] Complete README.md with setup instructions
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Architecture diagram
- [ ] Database schema diagram
- [ ] Deployment guide