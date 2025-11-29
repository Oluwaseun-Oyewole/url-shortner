import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { appConfig } from './shared/config';

export function appCreate(app: INestApplication) {
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };

  const config = new DocumentBuilder()
    .addServer(`http://localhost:${appConfig().port}/`)
    .setTitle('Url Shortner API Gateway')
    .setDescription('Url Shortner API Gateway Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });
  SwaggerModule.setup('api', app, document, customOptions);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
}
