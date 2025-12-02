import { Controller } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';

@Controller('user-tokens')
export class UserTokensController {
  constructor(private readonly userTokensService: UserTokensService) {}
}
