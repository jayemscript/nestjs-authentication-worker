import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserProfileDto } from './dtos/user-profile.dto';
import { Private } from 'src/common/decorators/private.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Private()
  @Get('profile')
  async getProfile(@CurrentUser() user: any): Promise<UserProfileDto> {
    return this.usersService.getProfile(user.id);
  }

  @Private()
  @Put('profile')
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileDto> {
    return this.usersService.updateProfile(user.id, updateUserDto);
  }

  @Private()
  @Delete('deactivate')
  async deactivateAccount(
    @CurrentUser() user: any,
  ): Promise<{ message: string }> {
    return this.usersService.deactivateAccount(user.id);
  }
}
