import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
        password: process.env.REDIS_PASSWORD || undefined,
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
  );

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new BaseRpcExceptionFilter());

  await app.listen();
  console.log(`Auth Microservice is listening...`);
}
bootstrap().catch((error) => {
  console.error('Auth Microservice failed to start:', error);
  process.exit(1); // Optional: Exit process with failure code
});
