import { IsUUID } from 'class-validator';

export class RevokeSessionDto {
  @IsUUID()
  sessionId!: string;
}
