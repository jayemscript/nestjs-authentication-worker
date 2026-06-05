# NestJS Authentication Worker

A standalone authentication service built with NestJS that provides centralized identity and authentication management for multiple applications.

It is designed to support scalable multi-application systems where authentication is shared but access is controlled per application context.

This service handles:

- Local authentication (email/password)
- OAuth authentication (Google, and extensible to GitHub, Microsoft, Facebook, etc.)
- Global user identity management
- App-based access control using `appId`
- Session and token management for web and mobile clients

It is not tied to any specific business domain and can be integrated into any system requiring authentication, including SaaS platforms, internal tools, and microservice architectures.

The core idea is to separate authentication from application logic, allowing multiple systems to share a single identity layer while maintaining flexible access rules per application.
