import { registerAs } from '@nestjs/config';
import { toInteger } from 'lodash';

export default registerAs('database', () => ({
  keepConnectionAlive: true,
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: toInteger(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || '',
  charset: process.env.DB_CHARSET || 'UTF8MB4_GENERAL_CI',
  supportBigNumbers: true,
  bigNumberStrings: false,
  uuidExtension: process.env.DB_UUID_EXTENSION || 'uuid-ossp',
  entityPrefix: process.env.DB_ENTITY_PREFIX || '',
  entities: [],
  installExtensions: true,
  subscribers: [],
  migrationsRun: false,
  synchronize: false,
  logging: process.env.APP_STAGE === 'dev',
  autoLoadEntities: true,
  timezone: process.env.DB_TZ || process.env.APP_TZ || 'local',
}));
