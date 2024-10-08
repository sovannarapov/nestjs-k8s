import { TableColumnOptions } from 'typeorm';
import { TimestampMigration } from '../common';

export class CreateTablePermissions1728145125114 extends TimestampMigration {
  public tableName = 'permissions';

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
      name: 'name',
      type: 'varchar',
    },
    {
      name: 'description',
      type: 'varchar',
    },
    {
      name: 'isActive',
      type: 'boolean',
      default: true,
    },
  ];
}
