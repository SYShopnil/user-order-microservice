import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TokenServiceTsService } from './token.service.ts.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthUser } from './entities/auth-user.entity';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('config.jwt.secret') ?? 'defaultSecretKey',
        signOptions: {
          expiresIn: config.get<string>('config.jwt.expiresIn') ?? '3600s',
        },
      }),
    }),
    TypeOrmModule.forFeature([AuthUser, Role]),
    ClientsModule.registerAsync([
      {
        name: 'USER_CLIENT',
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
  providers: [TokenServiceTsService, AuthService],
})
export class AuthModule {}
