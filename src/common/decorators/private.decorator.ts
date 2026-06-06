//src/commons/decorators/private.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PRIVATE_KEY = 'isPrivate';
export const Private = () => SetMetadata(PRIVATE_KEY, true);