import { Module } from '@nestjs/common';
import { IntegrationServicesModule } from 'src/integration-services/integration.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, IntegrationServicesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
