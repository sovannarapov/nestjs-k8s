import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  description: string;
}
