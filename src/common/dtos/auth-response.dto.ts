//src/common/dtos/auth-response.dto.ts
export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  expiresIn!: number;
  user!: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}