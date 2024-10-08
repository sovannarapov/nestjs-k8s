import type { TableColumnOptions } from 'typeorm';

import { TimestampMigration } from '../common';

export class CreateTableUsers1691653735984 extends TimestampMigration {
  public tableName = 'users';

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
      name: 'firstName',
      type: 'varchar',
    },
    {
      name: 'lastName',
      type: 'varchar',
    },
    {
      name: 'email',
      type: 'varchar',
    },
    {
      name: 'password',
      type: 'varchar',
    },
    {
      name: 'isActive',
      type: 'boolean',
      default: true,
    },
  ];
}
