import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}
  async generateToken<T extends object>(
    payload: T,
    secret: string,
    expiresIn: string | number = '1h',
    options?: Omit<JwtSignOptions, 'secret' | 'expiresIn'>,
  ): Promise<string> {
    try {
      return this.jwt.signAsync(payload, {
        secret,
        expiresIn,
        ...options,
      });
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      throw new RpcException(err.message);
    }
  }

  async verifyToken<T extends object>(
    token: string,
    secret: string,
  ): Promise<T> {
    return this.jwt.verifyAsync<T>(token, { secret });
  }
}
