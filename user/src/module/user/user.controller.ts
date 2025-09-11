import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { PATTERNS } from 'src/common/pattern';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @MessagePattern(PATTERNS.USER_CREATE)
  async createProfile(
    @Payload()
    payload: {
      user_id: string;
      email: string;
      display_name?: string;
    },
  ) {
    return await this.service.createOrUpdateProfile(payload);
  }
}
