import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  emailOrUsername!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
