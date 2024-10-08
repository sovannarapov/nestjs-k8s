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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from '../../../global/payload/responses/Response';
import { AccessTokenSecurity, RefreshTokenSecurity } from '../../securities';
import { SerializeUser } from '../../decorators';
import { UserDto } from '../../dtos/responses';
import { RefreshtokenDto, RegisterDto, SigninDto } from '../../dtos/requests';
import { AuthService } from '../../services/auth/auth.service';
import { UpdateProfileDto } from '../../dtos/requests/auth/update-profile.dto';
import { LoginResponseDto } from '@/user/dtos/responses/auth/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenSecurity)
  @Get('user/profile')
  @ApiResponse({
    type: UserDto,
    description: 'Get the user profile',
  })
  getUser(@SerializeUser() user: UserDto): Response<UserDto> {
    return Response.data(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    type: UserDto,
    description: 'Register a new user',
  })
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<Response<UserDto>> {
    return Response.data(await this.authService.register(dto));
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginResponseDto,
    description: 'Signin the user account',
  })
  @Post('signin')
  async signin(@Body() dto: SigninDto): Promise<Response<LoginResponseDto>> {
    return Response.data(await this.authService.signin(dto));
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenSecurity)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Refresh the user token',
  })
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
  @ApiResponse({
    type: UserDto,
    description: 'Update the user profile',
  })
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
  @ApiResponse({
    description: 'Signout the user',
  })
  @Delete('signout')
  async signout(@SerializeUser() user: UserDto): Promise<Response<string>> {
    await this.authService.signout(user);
    return Response.data('Successfully deleted user.');
  }
}
