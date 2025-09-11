import { Controller } from '@nestjs/common';
import { PATTERNS } from 'src/common/pattern';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @MessagePattern(PATTERNS.AUTH_REGISTER)
  register(@Payload() dto: RegisterDto) {
    return this.service.register(dto);
  }
}
