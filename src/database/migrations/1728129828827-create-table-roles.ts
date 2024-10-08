import { TableColumnOptions } from 'typeorm';
import { TimestampMigration } from '../common';

export class CreateTableRoles1728129828827 extends TimestampMigration {
  public tableName = 'roles';

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
