import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../dtos/responses';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../../decorators';
import { PermissionGuard } from '../../securities/permissions.security';
import { Response } from '../../../global/payload/responses/Response';
import { CreateUserDto, UpdateUserDto } from '../../dtos/requests';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions('user::read')
  @UseGuards(PermissionGuard)
  @Get('page')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Response<Pagination<UserDto>>,
    description: 'Get all role with pagination',
  })
  async getAllRoleWithPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
  ): Promise<Response<Pagination<UserDto>>> {
    return Response.data(
      await this.userService.getAllUsersWithPagination(page, size),
    );
  }

  @Permissions('user::read')
  @UseGuards(PermissionGuard)
  @Get()
  @ApiResponse({
    type: Response<UserDto[]>,
    description: 'Get the users',
  })
  @HttpCode(HttpStatus.OK)
  getAllUsers(): Promise<Response<UserDto[]>> {
    return this.userService.getAllUsers();
  }

  @Permissions('user::read')
  @UseGuards(PermissionGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Response<UserDto>,
    description: 'Get the user by id',
  })
  getUserById(@Param('id') id: string): Promise<Response<UserDto>> {
    return this.userService.getUserById(id);
  }

  @Permissions('user::write')
  @UseGuards(PermissionGuard)
  @Post()
  @ApiResponse({
    type: Response<UserDto>,
    description: 'Create a new user',
  })
  createUser(@Body() createUserDto: CreateUserDto): Promise<Response<UserDto>> {
    return this.userService.createUser(createUserDto);
  }

  @Permissions('user::update')
  @UseGuards(PermissionGuard)
  @Patch(':id')
  @ApiResponse({
    type: Response<UserDto>,
    description: 'Update the user by id',
  })
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response<UserDto>> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Permissions('user::delete')
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'Delete the user by id',
  })
  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<Response<string>> {
    await this.userService.deleteUserById(id);
    return Response.ok();
  }
}
