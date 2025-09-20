"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    // url: 'postgresql://fitxone_app:FitxoneP4ss2025@127.0.0.1/fitxone',
    host: config_1.default.dbHost,
    port: config_1.default.dbPort,
    username: config_1.default.dbUsername,
    password: config_1.default.dbPassword,
    database: config_1.default.dbName,
    logging: config_1.default.dbLogging,
    synchronize: config_1.default.dbSynchronize,
    entities: ['src/entities/*.ts'],
    migrationsTableName: 'migrationHistory',
    migrations: ['src/migration/*.ts', 'src/migration/newMigrationFile.ts'],
});
exports.default = dataSource;
