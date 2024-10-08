import { AutoMap } from '@automapper/classes';
import { RoleDto } from '../role/role.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  isActive: boolean;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt: Date;

  @ApiProperty()
  @AutoMap()
  roles: RoleDto;
}
