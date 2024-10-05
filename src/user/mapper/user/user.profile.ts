import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterDto, UpdateUserDto } from '../../dtos/requests';
import { User } from '../../entities';
import { UserDto } from '../../dtos/responses';
import { UpdateProfileDto } from '../../dtos/requests/auth/update-profile.dto';
import { Role } from '../../entities/role.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // entity to dto
      createMap(mapper, User, UserDto);
      // dto to entity
      createMap(
        mapper,
        RegisterDto,
        User,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        CreateUserDto,
        User,
        forMember((dest) => dest.id, ignore()),
        forMember(
          (dest) => dest.roles,
          mapFrom((r) => r.roles.map((s) => ({ id: s }) as Role)),
        ),
      );
      createMap(
        mapper,
        UpdateUserDto,
        User,
        forMember(
          (dest) => dest.roles,
          mapFrom((r) => r.roles.map((s) => ({ id: s }) as Role)),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom(() => new Date()),
        ),
      );
      createMap(
        mapper,
        UpdateProfileDto,
        User,
        forMember(
          (dest) => dest.updatedAt,
          mapFrom(() => new Date()),
        ),
      );
    };
  }
}
