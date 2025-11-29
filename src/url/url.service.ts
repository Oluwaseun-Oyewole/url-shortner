import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto';
import { Url } from './entity/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async createShortUrl(createUrlDto: CreateUrlDto) {
    const { customCode, originalUrl } = createUrlDto;
    let shortCode = customCode || randomBytes(4).toString('hex');
    while (await this.urlRepository.findOne({ where: { shortCode } })) {
      shortCode = randomBytes(4).toString('hex');
    }
    const url = this.urlRepository.create({ shortCode, originalUrl });
    return await this.urlRepository.save(url);
  }

  async getOriginalCode(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findOne({ where: { shortCode } });
    if (!url) throw new NotFoundException('URL not found');
    url.clicks += 1;
    await this.urlRepository.save(url);
    return url.originalUrl;
  }

  async getStats(shortCode: string): Promise<Url> {
    return await this.urlRepository.findOne({ where: { shortCode } });
  }
}
