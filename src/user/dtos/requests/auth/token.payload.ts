import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  access_token: string;

  @ApiPropertyOptional()
  refresh_token?: string;
}
