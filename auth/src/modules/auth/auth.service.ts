/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from './entities/auth-user.entity';
import { Role } from './entities/role.entity';
import { RegisterDto } from './dtos';
import { PATTERNS } from 'src/common/pattern';
import { firstValueFrom, Observable, timeout } from 'rxjs';
import { ERoleName } from './enums';
import * as bcrypt from 'bcrypt';
import { IRegisterResult, IUserProfile } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser) private readonly users: Repository<AuthUser>,
    @InjectRepository(Role) private readonly roles: Repository<Role>,
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  async register(dto: RegisterDto): Promise<IRegisterResult> {
    const exists = await this.users.findOne({ where: { email: dto.email } });
    if (exists) throw new RpcException('Email already in use');

    const role = await this.ensureDefaultRole(dto.role ?? ERoleName.USER);
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const password_hash: string = await bcrypt.hash(dto.password, saltRounds);

    const entity = this.users.create({
      email: dto.email,
      password_hash: password_hash,
      is_active: true,
      refresh_token_hash: null,
      role,
    });
    const saved = await this.users.save(entity);

    //make a call to user microservice to create user profile
    const user$: Observable<IUserProfile> = this.userClient
      .send<IUserProfile>(PATTERNS.USER_CREATE, {
        user_id: saved.user_id,
        email: saved.email,
        display_name: dto.display_name ?? saved.email.split('@')[0],
      })
      .pipe(timeout(5000));

    //create profile in user microservice database
    const profile: IUserProfile = await firstValueFrom(user$).catch(() => {
      throw new RpcException('Failed to create user profile');
    });

    return {
      user_id: saved.user_id,
      email: saved.email,
      role: saved.role?.name,
      profile,
      message: 'Registration successful',
    };
  }

  private async ensureDefaultRole(code: ERoleName) {
    let role = await this.roles.findOne({ where: { name: code } });
    if (!role) {
      role = this.roles.create({ name: code });
      role = await this.roles.save(role);
    }
    return role;
  }
}
