import { TableColumnOptions, TableForeignKeyOptions } from 'typeorm';
import { DefaultMigration } from '../common';

export class CreateTableUsersRoles1728197247041 extends DefaultMigration {
  public tableName = 'users_roles';

  public columns: TableColumnOptions[] = [
    {
      name: 'userId',
      type: 'uuid',
    },
    {
      name: 'roleId',
      type: 'uuid',
    },
  ];

  public foreignKeys: TableForeignKeyOptions[] = [
    {
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
    },
    {
      columnNames: ['roleId'],
      referencedTableName: 'roles',
      referencedColumnNames: ['id'],
    },
  ];
}
