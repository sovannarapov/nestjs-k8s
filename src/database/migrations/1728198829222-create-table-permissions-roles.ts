import { TableColumnOptions, TableForeignKeyOptions } from 'typeorm';
import { DefaultMigration } from '../common';

export class CreateTablePermissionsRoles1728198829222 extends DefaultMigration {
  public tableName = 'permissions_roles';

  public columns: TableColumnOptions[] = [
    {
      name: 'permissionId',
      type: 'uuid',
    },
    {
      name: 'roleId',
      type: 'uuid',
    },
  ];

  public foreignKeys: TableForeignKeyOptions[] = [
    {
      columnNames: ['permissionId'],
      referencedTableName: 'permissions',
      referencedColumnNames: ['id'],
    },
    {
      columnNames: ['roleId'],
      referencedTableName: 'roles',
      referencedColumnNames: ['id'],
    },
  ];
}
