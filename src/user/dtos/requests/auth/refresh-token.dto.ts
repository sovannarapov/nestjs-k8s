import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshtokenDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  refreshToken: string;
}
