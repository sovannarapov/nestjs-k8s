import { TableColumnOptions } from 'typeorm';
import { TimestampMigration } from '../common';

export class CreateTableRefreshToken1728145106088 extends TimestampMigration {
  public tableName = 'refresh_token';

  public columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      isUnique: true,
      isGenerated: true,
      unsigned: true,
      generationStrategy: 'uuid',
    },
    {
      name: 'token',
      type: 'varchar',
    },
    {
      name: 'userId',
      type: 'uuid',
      unsigned: true,
      isNullable: true,
    },
  ];
}
