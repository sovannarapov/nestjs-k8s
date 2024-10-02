import { DataType } from './constant';

const TimestampColumns = [
  {
    name: 'createdAt',
    type: DataType.DateTime,
    isNullable: true,
    isCreateDate: true,
  },
  {
    name: 'updatedAt',
    type: DataType.DateTime,
    isUpdateDate: true,
    default: 'CURRENT_TIMESTAMP',
  },
];

const TimestampSoftDeleteColumns = [
  ...TimestampColumns,
  {
    name: 'deletedAt',
    type: DataType.DateTime,
    isNullable: true,
  },
];

export { TimestampColumns, TimestampSoftDeleteColumns };
