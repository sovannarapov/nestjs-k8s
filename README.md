# API

### Database Migration

- Run `yarn migration:run` to run the whole migration.
- Run `yarn migration:create <path/migration-file-name>` to create a new migration file.
- Run `yarn migration:generate <path/migration-file-name>` to generate a new migration file from entity.
- Run `yarn migration:revert <path/migration-file-name>` to execute `down` in the latest executed migration.
- Run `yarn migration:drop` to drop the whole migration.
- Run `yarn migration:refresh` to drop and run the whole migration again.
