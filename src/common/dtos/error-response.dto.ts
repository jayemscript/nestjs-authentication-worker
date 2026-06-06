//src/common/dtos/auth-response.dto.ts
export class ErrorResponseDto {
  statusCode!: number;
  message!: string;
  error?: string;
  timestamp!: string;
  path?: string;
  details?: Record<string, any>;
}