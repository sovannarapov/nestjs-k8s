import { DefaultMigration } from './default.migration';
import { TimestampColumns } from './default.columns';

export class TimestampMigration extends DefaultMigration {
  public defaultColumns = TimestampColumns;
}
