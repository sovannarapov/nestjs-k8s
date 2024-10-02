import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { accessTokenConfig, refreshTokenConfig } from './global/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UniqueExistConstraint } from './user/decorators/unique.validation.decorator';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import configs from '@/config';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      load: [...configs, accessTokenConfig, refreshTokenConfig],
      isGlobal: true,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      expandVariables: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => configService.get('database'),
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        const dataSource = new DataSource(options);

        try {
          if (!dataSource.isInitialized) {
            await dataSource.initialize();
          }

          return addTransactionalDataSource(dataSource);
        } catch {
          /* empty */
        }

        return dataSource;
      },
    }),
    UserModule,
  ],
  providers: [UniqueExistConstraint],
})
export class AppModule {}
