import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from '../../../global/payload/responses/Response';
import { AccessTokenSecurity, RefreshTokenSecurity } from '../../securities';
import { SerializeUser } from '../../decorators';
import { UserDto } from '../../dtos/responses';
import { RefreshtokenDto, RegisterDto, SigninDto } from '../../dtos/requests';
import { AuthService } from '../../services/auth/auth.service';
import { UpdateProfileDto } from '../../dtos/requests/auth/update-profile.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenSecurity)
  @Get('user/profile')
  getUser(@SerializeUser() user: UserDto): Response<UserDto> {
    return Response.data(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<Response<UserDto>> {
    return Response.data(await this.authService.register(dto));
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: SigninDto): Promise<
    Response<{
      access_token: string;
      refresh_token: string;
    }>
  > {
    return Response.data(await this.authService.signin(dto));
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenSecurity)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(
    @SerializeUser() user: UserDto,
    @Body() dto: RefreshtokenDto,
  ): Promise<
    Response<{
      access_token: string;
    }>
  > {
    return Response.data(await this.authService.refreshToken(user, dto));
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenSecurity)
  @Patch('user/profile')
  async editUser(
    @SerializeUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<Response<UserDto>> {
    return Response.data(await this.authService.updateUser(userId, dto));
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenSecurity)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('signout')
  async signout(@SerializeUser() user: UserDto): Promise<Response<string>> {
    await this.authService.signout(user);
    return Response.data('Successfully deleted user.');
  }
}
