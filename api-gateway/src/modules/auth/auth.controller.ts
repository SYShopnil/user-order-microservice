import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { firstValueFrom, timeout } from 'rxjs';
import { PATTERNS } from 'src/common/pattern';
import { RegisterRequestDto, RegisterResponseDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
  ) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterRequestDto })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Validation failed or bad input' })
  @ApiConflictResponse({ description: 'Email already in use' })
  async register(
    @Body() dto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    try {
      return await firstValueFrom(
        this.authClient.send(PATTERNS.AUTH_REGISTER, dto).pipe(timeout(5000)),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
