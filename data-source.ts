import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import database from 'src/config/database';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

config();

const dataSourceOptions: DataSourceOptions & TypeOrmModuleOptions = {
  ...(database() as DataSourceOptions),
  entities: ['src/**/*.entity.{ts,js}'],
  subscribers: ['src/**/*.subscriber*.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
};

export default new DataSource(dataSourceOptions);
