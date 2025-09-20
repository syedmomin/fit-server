"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.production' : '.env.development';
const result = dotenv.config({ path: path.resolve(__dirname, '../' + envFile) });
if (result.error) {
    throw result.error;
}
function getEnvVariable(name, required = true) {
    const value = process.env[name];
    if (required && !value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}
function parseBoolean(value) {
    return value === 'true';
}
exports.default = {
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
