import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IntegrationServicesModule } from './integration-services/integration.module';
import { appConfig, typeOrmConfig } from './shared/config';
import { UrlModule } from './url/url.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UrlModule,
    UsersModule,
    AuthModule,
    IntegrationServicesModule,
    UserTokensModule,
  ],
})
export class AppModule {}
