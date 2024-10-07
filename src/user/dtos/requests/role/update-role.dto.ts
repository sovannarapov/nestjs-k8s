import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsOptional()
  permissions?: string[];
}
