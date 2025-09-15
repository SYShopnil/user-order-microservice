import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { firstValueFrom, timeout } from 'rxjs';
import { PATTERNS } from 'src/common/pattern';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: RegisterRequestDto })
  @ApiCreatedResponse({
    description: 'User logged in successfully',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Validation failed or bad input' })
  @ApiConflictResponse({ description: 'Email already in use' })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      // throw new Error('Temporary error for testing'); // Simulate an error÷
      // throw new NotFoundException('User not found');
      // throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      // throw new RpcException(new ForbiddenException('Custom error message'));

      return await firstValueFrom(
        this.authClient.send(PATTERNS.AUTH_LOGIN, dto).pipe(timeout(5000)),
      );
    } catch (err) {
      if (err instanceof HttpException) {
        throw err; // Re-throw known HttpExceptions
      } else if (err instanceof RpcException) {
        console.log(err.getError());
        // throw new InternalServerErrorException(err.message);
        throw new HttpException(
          (err.getError() as any).message || 'RPC Exception occurred',
          (err.getError() as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.log(err);
        throw new InternalServerErrorException(err);
      }
      // console.log(err);
      // throw new InternalServerErrorException(err);
    }
  }
}
