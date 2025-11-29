import { ApiProperty } from '@nestjs/swagger';
import { Url } from '../entity/url.entity';
import { UrlResponse } from './url-response.dto';

export class UrlResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: UrlResponse })
  url: UrlResponse;

  constructor(data: { message: string; url: Url | UrlResponse }) {
    this.message = data.message;
    this.url =
      data.url instanceof UrlResponse ? data.url : new UrlResponse(data.url);
  }
}
