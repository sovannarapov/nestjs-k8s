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
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../../services/role/role.service';
import { PermissionGuard } from '../../securities/permissions.security';
import { Permissions } from '../../decorators';
import { Response } from '../../../global/payload/responses/Response';
import { RoleDto } from '../../dtos/responses/role/role.dto';
import { CreateRoleDto } from '../../dtos/requests/role/create-role.dto';
import { UpdateRoleDto } from '../../dtos/requests/role/update-role.dto';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions('role::read')
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Response<Pagination<RoleDto>>,
    description: 'Get all role with pagination',
  })
  @Get('page')
  async getAllRoleWithPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number = 10,
  ): Promise<Response<Pagination<RoleDto>>> {
    return Response.data(
      await this.roleService.getAllRolesWithPagination(page, size),
    );
  }

  @Permissions('role::read')
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Response<RoleDto[]>,
    description: 'Get all the roles',
  })
  @Get()
  getAllRoles(): Promise<Response<RoleDto[]>> {
    return this.roleService.getAllRoles();
  }

  @Permissions('role::read')
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: Response<RoleDto>,
    description: 'Get the role by id',
  })
  @Get(':id')
  getRoleById(@Param('id') id: string): Promise<Response<RoleDto>> {
    return this.roleService.getRoleById(id);
  }

  @Permissions('role::write')
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: Response<RoleDto>,
    description: 'Create a new role',
  })
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Response<RoleDto>> {
    return this.roleService.createRole(createRoleDto);
  }

  @Permissions('role::update')
  @UseGuards(PermissionGuard)
  @ApiResponse({
    type: Response<RoleDto>,
    description: 'Update the role by id',
  })
  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() updareRoleDto: UpdateRoleDto,
  ): Promise<Response<RoleDto>> {
    return this.roleService.updateRoleById(id, updareRoleDto);
  }

  @Permissions('role::delete')
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'Delete the role by id',
  })
  @Delete(':id')
  async deleteRoleById(@Param('id') id: string): Promise<Response<string>> {
    await this.roleService.deleteRoleById(id);
    return Response.ok();
  }
}
