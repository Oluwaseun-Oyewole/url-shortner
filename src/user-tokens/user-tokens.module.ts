import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './entity';
import { UserTokensController } from './user-tokens.controller';
import { UserTokensService } from './user-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken])],
  controllers: [UserTokensController],
  providers: [UserTokensService],
  exports: [UserTokensService],
})
export class UserTokensModule {}
