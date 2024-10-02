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
  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  @Unique(User)
  email: string;

  @ApiProperty()
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

  @ApiProperty()
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
