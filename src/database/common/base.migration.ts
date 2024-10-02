/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableForeignKeyOptions } from 'typeorm/schema-builder/options/TableForeignKeyOptions';
import { TableIndexOptions } from 'typeorm/schema-builder/options/TableIndexOptions';

import {
  createForeignKey,
  createIndex,
  dropForeignKey,
  dropIndex,
} from './helper';

export abstract class BaseMigration implements MigrationInterface {
  public tableName = '';
  public foreignKeys: TableForeignKeyOptions[] = [];
  public indexes: TableIndexOptions[] = [];

  public async beforeUp(_queryRunner: QueryRunner): Promise<void> {
    // TODO
  }

  public async up(_queryRunner: QueryRunner): Promise<any> {
    // TODO
  }

  async afterUp(_queryRunner: QueryRunner): Promise<void> {
    // TODO
  }

  public async beforeDown(_queryRunner: QueryRunner): Promise<void> {
    // TODO
  }

  public async down(_queryRunner: QueryRunner): Promise<any> {
    // TODO
  }

  public async afterDown(_queryRunner: QueryRunner): Promise<any> {
    // TODO
  }

  protected _getTableName(tableName = '') {
    if (!tableName) {
      tableName = this.tableName;
    }
    return `${process.env.DB_ENTITY_PREFIX || ''}${tableName}`;
  }

  protected async _createForeignKey(queryRunner: QueryRunner): Promise<any> {
    if (!this.foreignKeys.length) {
      return;
    }
    for (const options of this.foreignKeys) {
      await createForeignKey(queryRunner, this._getTableName(), options);
    }
  }

  protected async _dropForeignKey(queryRunner: QueryRunner): Promise<any> {
    if (!this.foreignKeys.length) {
      return;
    }
    for (const options of this.foreignKeys) {
      await dropForeignKey(queryRunner, this._getTableName(), options);
    }
  }

  protected async _createIndex(queryRunner: QueryRunner): Promise<any> {
    if (!this.indexes.length) {
      return;
    }
    for (const options of this.indexes) {
      await createIndex(queryRunner, this._getTableName(), options);
    }
  }

  protected async _dropIndex(queryRunner: QueryRunner): Promise<any> {
    if (!this.indexes.length) {
      return;
    }
    for (const options of this.indexes) {
      await dropIndex(queryRunner, this._getTableName(), options);
    }
  }
}
