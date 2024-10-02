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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  @Get('page')
  @HttpCode(HttpStatus.OK)
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
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllRoles(): Promise<Response<RoleDto[]>> {
    return this.roleService.getAllRoles();
  }

  @Permissions('role::read')
  @UseGuards(PermissionGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getRoleById(@Param('id') id: string): Promise<Response<RoleDto>> {
    return this.roleService.getRoleById(id);
  }

  @Permissions('role::write')
  @UseGuards(PermissionGuard)
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Response<RoleDto>> {
    return this.roleService.createRole(createRoleDto);
  }

  @Permissions('role::update')
  @UseGuards(PermissionGuard)
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
  @Delete(':id')
  async deleteRoleById(@Param('id') id: string): Promise<Response<string>> {
    await this.roleService.deleteRoleById(id);
    return Response.ok();
  }
}
