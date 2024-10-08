import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Unique } from '../../../decorators/unique.validation.decorator';
import { User } from '../../../entities';
import { Match } from '../../../../global/decorator/password/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  @Unique(User)
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}
