import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IntegrationServicesModule } from 'src/integration-services/integration.module';
import { appConfig } from 'src/shared/config';
import { UserTokensModule } from 'src/user-tokens/user-tokens.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    IntegrationServicesModule,
    UserTokensModule,
    JwtModule.register({ secret: appConfig().jwtSecretKey }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
