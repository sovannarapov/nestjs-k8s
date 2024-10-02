import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
  });

  app.enableCors();

  const config = app.get(ConfigService);
  const apiDocConfig = config.get('api.doc');

  if (!apiDocConfig.enabled) {
    return;
  }

  let description = `
  This is documentation for the API Endpoint.
  \nFor every request you must include in the header, Content-Type: application/json.`;

  const builder = new DocumentBuilder()
    .setTitle('Nestjs K8S App')
    .setVersion('1.0');
  const apiKeyConfig = config.get('api.key');

  if (apiKeyConfig.enabled) {
    const apiKeyName = apiKeyConfig.name;
    const apiKeyPrefix = 'prefix';
    const apiKeyValue = 'secret api key';
    description =
      description +
      `
          \nFor all resources are prohibiting. To unlock access, you must include the ${apiKeyName} in header.
          \nEg. -H "${apiKeyName}: ${apiKeyPrefix}${apiKeyValue}"`;
    builder.addApiKey({ type: 'apiKey', name: 'x-api-key' }, 'apiKey');
  }

  builder.addBearerAuth();
  // builder.addApiKey({ type: 'apiKey', name: 'x-application-id' }, 'appId');
  // builder.addApiKey({ type: 'apiKey', name: 'x-application-key' }, 'appKey');

  builder.setDescription(description);

  const path = apiDocConfig.path;

  app.use(
    path,
    basicAuth({
      challenge: true,
      users: {
        [`${apiDocConfig.user}`]: apiDocConfig.pwd,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, builder.build());
  const options = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(3000);
}
bootstrap();
