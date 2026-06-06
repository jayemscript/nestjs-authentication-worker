import { Controller, Post, Get, Body, UseGuards, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RefreshGuard } from 'src/common/guards/refresh.guard';
import { CookieUtil } from 'src/common/utils/cookie.util';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Throttle } from '@nestjs/throttler';
import { Private } from 'src/common/decorators/private.decorator';
import { User } from '../users/entities/user.entity';
import { AuthVerifyResponseDto } from './dtos/auth-verify-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  // @Throttle({ auth: { ttl: 60000, limit: 10 } })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);

    const cookieExpiration =
      this.configService.get<number>('COOKIE_EXPIRATION') || 2592000000;

    CookieUtil.setAccessTokenCookie(res, result.accessToken, cookieExpiration);
    CookieUtil.setRefreshTokenCookie(
      res,
      result.refreshToken,
      cookieExpiration,
    );

    return result;
  }

  @Public()
  @Post('login')
  // @Throttle({ auth: { ttl: 60000, limit: 10 } })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    const cookieExpiration =
      this.configService.get<number>('COOKIE_EXPIRATION') || 2592000000;

    CookieUtil.setAccessTokenCookie(res, result.accessToken, cookieExpiration);
    CookieUtil.setRefreshTokenCookie(
      res,
      result.refreshToken,
      cookieExpiration,
    );

    return result;
  }

  @Private()
  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    const result = await this.authService.refreshToken(refreshToken);

    const cookieExpiration =
      this.configService.get<number>('COOKIE_EXPIRATION') || 2592000000;

    CookieUtil.setAccessTokenCookie(res, result.accessToken, cookieExpiration);

    return result;
  }

  @Private()
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    const result = await this.authService.logout();
    CookieUtil.clearAllCookies(res);
    return result;
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  async verify(@CurrentUser() user: any): Promise<AuthVerifyResponseDto> {
    return this.authService.verify(user.id);
  }
}
