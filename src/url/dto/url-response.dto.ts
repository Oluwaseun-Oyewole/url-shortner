import { ApiProperty } from '@nestjs/swagger';
import { Url } from '../entity/url.entity';

export class UrlResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  shortCode: string;

  @ApiProperty()
  clicks: number;

  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  createdAt: Date;

  constructor(url: Url) {
    this.id = url.id;
    this.originalUrl = url.originalUrl;
    this.shortCode = url.shortCode;
    this.clicks = url.clicks;
  }
}

export class ClickResponse {
  @ApiProperty()
  clicks: number;

  constructor(url: Url) {
    this.clicks = url.clicks;
  }
}
