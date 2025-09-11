import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
}));
