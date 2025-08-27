import { DataSource } from "typeorm";
import config from "./config";

const dataSource = new DataSource({
  type: "postgres",
  url: 'postgresql://neondb_owner:npg_dB4M3qcpGrJm@ep-soft-paper-ad1yiuww-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  // host: config.dbHost,
  // port: config.dbPort,
  // username: config.dbUsername,
  // password: config.dbPassword,
  // database: config.dbName,
  logging: config.dbLogging as boolean,
  synchronize: config.dbSynchronize as boolean,
  entities: ['src/entities/*.ts'],
  migrationsTableName: 'migrationHistory',
  migrations:  ['src/migration/*.ts', 'src/migration/newMigrationFile.ts'],
});

export default dataSource;
