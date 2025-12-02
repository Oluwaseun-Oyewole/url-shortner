import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class verifyAccountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
