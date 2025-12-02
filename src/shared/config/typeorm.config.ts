import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Url } from 'src/url/entity/url.entity';
import { UserToken } from 'src/user-tokens/entity';
import { User } from 'src/users/entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT'), 10),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  autoLoadEntities: true,
  entities: [UserToken, User, Url],
  synchronize: true, // Set to false in production
});
