import { DataSource } from "typeorm";
import config from "./config";

const dataSource = new DataSource({
  type: "postgres",
  // url: 'postgresql://fitxone_app:FitxoneP4ss2025@127.0.0.1/fitxone',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName,
  logging: config.dbLogging as boolean,
  synchronize: config.dbSynchronize as boolean,
  entities: ['src/entities/*.ts'],
  migrationsTableName: 'migrationHistory',
  migrations:  ['src/migration/*.ts', 'src/migration/newMigrationFile.ts'],
});

export default dataSource;
