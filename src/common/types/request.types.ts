//src/common/types/request.types.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role?: string;
        iat?: number;
        exp?: number;
      };
      session?: {
        id: string;
        userId: string;
        deviceFingerprint: string;
        createdAt: Date;
      };
      appId?: string;
    }
  }
}