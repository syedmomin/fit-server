import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.production' : '.env.development';

const result = dotenv.config({ path: path.resolve(__dirname, '../'+ envFile) });

if (result.error) {
  throw result.error;
}

function getEnvVariable(name: string, required: boolean = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value as string;
}

function parseBoolean(value: string | undefined): boolean {
  return value === 'true';
}

export default {
  // app keys 
  port: parseInt(getEnvVariable('PORT', false) || '8080', 10),
  appUrl: getEnvVariable('APP_URL'),
  jwtSecretKey: getEnvVariable('JWT_SECRET_KEY'),
  jwtExpireTime: getEnvVariable('JWT_EXPIRATION_TIME'),
  refreshExpireTime: getEnvVariable('REFRESH_TOKEN_EXPIRATION_TIME'),

  // database keys 
  dbHost: getEnvVariable('DB_HOST'),
  dbPort: parseInt(getEnvVariable('DB_PORT'), 10),
  dbUsername: getEnvVariable('DB_USERNAME'),
  dbPassword: getEnvVariable('DB_PASSWORD'),
  dbName: getEnvVariable('DB_NAME'),
  dbSynchronize: parseBoolean(getEnvVariable('DB_SYNCHRONIZE')),
  dbLogging: parseBoolean(getEnvVariable('DB_LOGGING')),
};
