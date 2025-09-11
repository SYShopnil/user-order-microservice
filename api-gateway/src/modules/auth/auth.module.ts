import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get<string>('config.redis.host', 'localhost'),
            port: config.get<number>('config.redis.port', 6379),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
