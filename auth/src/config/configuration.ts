import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'defaultSecretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
  },
}));
