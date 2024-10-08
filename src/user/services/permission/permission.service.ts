import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Permission } from '../../entities/permission.entity';
import { Response } from '../../../global/payload/responses/Response';
import { PermissionDto } from '../../dtos/responses/permission/permission.dto';
import { CreatePermissionDto } from '../../dtos/requests/permission/create-permission.dto';
import { UpdatePermissionDto } from '../../dtos/requests/permission/update-permission.dto';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}

  public async getAllPermissions(): Promise<Response<PermissionDto[]>> {
    const permissions = await this.permissionRepo.find();
    return Response.data(
      await this.classMapper.mapArrayAsync(
        permissions,
        Permission,
        PermissionDto,
      ),
    );
  }
  public async getAllPermissionsWithPagination(
    page: number,
    size: number,
  ): Promise<Pagination<PermissionDto>> {
    const permissionPagination = await paginate<Permission>(
      this.permissionRepo,
      { page: page, limit: size } as IPaginationOptions,
    );
    return new Pagination<PermissionDto>(
      await this.classMapper.mapArrayAsync(
        permissionPagination.items,
        Permission,
        PermissionDto,
      ),
      permissionPagination.meta,
      permissionPagination.links,
    );
  }
  public async getPermissionById(
    permissionId: string,
  ): Promise<Response<PermissionDto>> {
    const role = await this.permissionRepo.findOne({
      where: { id: permissionId, isActive: true },
    });
    if (!role) throw new NotFoundException('Permission not found!');
    return Response.data(this.classMapper.map(role, Permission, PermissionDto));
  }

  public async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Response<PermissionDto>> {
    const permission = this.classMapper.map(
      createPermissionDto,
      CreatePermissionDto,
      Permission,
    );

    return Response.data(
      await this.classMapper.mapAsync(
        await this.permissionRepo.save({
          ...permission,
          createdAt: new Date(),
        }),
        Permission,
        PermissionDto,
      ),
    );
  }

  public async updatePermissionById(
    permissionId: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Response<PermissionDto>> {
    const role = await this.permissionRepo.findOne({
      where: { id: permissionId },
    });
    if (!role) throw new NotFoundException('Permission not found!');
    const updateModel = this.classMapper.map(
      updatePermissionDto,
      UpdatePermissionDto,
      Permission,
    );
    return Response.data(
      await this.classMapper.mapAsync(
        await this.permissionRepo.save({ id: permissionId, ...updateModel }),
        Permission,
        PermissionDto,
      ),
    );
  }

  public async deletePermissionById(permissionId: string): Promise<void> {
    const role = await this.permissionRepo.findOne({
      where: { id: permissionId },
    });
    if (!role) throw new NotFoundException('Permission not found!');
    this.permissionRepo.remove(role);
  }
}
