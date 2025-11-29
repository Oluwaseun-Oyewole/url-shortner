import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUrlDto {
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  originalUrl: string;

  @IsOptional()
  @Length(4, 10)
  @IsString()
  @ApiProperty()
  customCode?: string;
}
