import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from 'src/shared/decorators/swagger.decorators';
import { CreateUrlDto } from './dto';
import { ClickResponse } from './dto/url-response.dto';
import { UrlResponseDto } from './dto/url.dto';
import { UrlService } from './url.service';

@ErrorApiResponse()
@ApiTags('url')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiOperation({ summary: 'Shorten URL' })
  @SuccessApiResponse(UrlResponseDto, {
    status: 201,
    description: 'Shorten a long url',
    message: 'Successful',
  })
  @ApiBody({
    type: CreateUrlDto,
    examples: {
      default: {
        summary: 'Example',
        value: {
          originalUrl:
            'https://www.youtube.com/watch?v=XvFmUE-36Kc&list=TLPQMjIxMDIwMjU_jVc2UYDLEQ&index=1',
          customCode: '12345',
        },
      },
    },
  })
  @Post('shorten')
  async shorten(@Body() body: CreateUrlDto) {
    const url = await this.urlService.createShortUrl(body);
    return {
      shortUrl: `http://localhost:3000/${url.shortCode}`,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
    };
  }

  @SuccessApiResponse(UrlResponseDto)
  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.urlService.getOriginalCode(shortCode);
    return {
      url,
      statusCode: HttpStatus.MOVED_PERMANENTLY,
    };
  }

  @SuccessApiResponse(ClickResponse)
  @Get('stats/:shortCode')
  async getStats(@Param('shortCode') shortCode: string) {
    return await this.urlService.getStats(shortCode);
  }
}
