import { ApiProperty } from '@nestjs/swagger';
import { Url } from '../entity/url.entity';
import { UrlResponse } from './url-response.dto';

export class UrlResponseDto {
  @ApiProperty({ type: UrlResponse })
  url: UrlResponse;

  constructor(data: { url: Url | UrlResponse }) {
    this.url =
      data.url instanceof UrlResponse ? data.url : new UrlResponse(data.url);
  }
}
