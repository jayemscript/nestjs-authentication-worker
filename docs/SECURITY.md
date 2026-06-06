# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email security@yourcompany.com instead of using the issue tracker.

## Security Best Practices

### Environment Variables

- Never commit `.env` files to version control
- Use `.env.example` as a template with placeholder values
- Store secrets in secure vaults in production (AWS Secrets Manager, HashiCorp Vault, etc.)
- Rotate secrets regularly

### Password Security

- Minimum 8 characters required
- Must contain uppercase, lowercase, and numbers
- Bcrypt hashing with 10+ rounds (configurable)
- Never log or expose passwords

### Token Security

- JWT secret must be at least 32 characters
- Access tokens: 15 minutes (short-lived)
- Refresh tokens: 30 days (long-lived)
- Tokens stored in HTTP-only cookies (not localStorage)
- HTTPS required in production

### Account Security

- Account locking after 5 failed login attempts
- 15-minute lockout period
- Track last login timestamp
- Support account deactivation (soft delete)

### Database Security

- Use parameterized queries (TypeORM handles this)
- Enable SSL for database connections in production
- Implement database backups and recovery procedures
- Use strong database credentials

### API Security

- Enable CORS with specific allowed origins
- Validate all input data
- Sanitize error messages (don't expose internal details)
- Implement rate limiting (commented out, can be enabled)
- Use X-App-ID header for multi-app context

### Deployment Security

- Set NODE_ENV=production in production
- Enable HTTPS/SSL
- Set COOKIE_SECURE=true in production
- Disable debug logging in production
- Implement proper monitoring and alerting

## Known Limitations

- Email verification not yet implemented
- SMS verification not yet implemented
- Password reset requires separate email service
- RBAC implemented as separate service

## Future Security Enhancements

- Two-factor authentication (2FA)
- OAuth2 provider integration
- Session-based logout per device
- Suspicious activity detection
- IP-based restrictions
- Audit logging for sensitive operations