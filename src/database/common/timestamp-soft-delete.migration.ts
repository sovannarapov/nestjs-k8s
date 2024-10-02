import { TimestampSoftDeleteColumns } from './default.columns';
import { DefaultMigration } from './default.migration';

export class TimestampSoftDeleteMigration extends DefaultMigration {
  public defaultColumns = TimestampSoftDeleteColumns;
}
