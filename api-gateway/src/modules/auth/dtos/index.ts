// src/modules/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassw0rd!', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'Jane', required: false })
  @IsOptional()
  @IsString()
  display_name?: string;
}

export class UserProfileDto {
  @ApiProperty({ example: '8f7a3a9a-7a1e-4a07-8d8c-52c4a1d8e6d2' })
  user_id!: string;

  @ApiProperty({ example: 'jane@example.com' })
  email!: string;

  @ApiProperty({ example: 'Jane' })
  display_name!: string;

  @ApiProperty({ example: null, nullable: true, required: false })
  bio?: string | null;
}

export class RegisterResponseDto {
  @ApiProperty({ example: '8f7a3a9a-7a1e-4a07-8d8c-52c4a1d8e6d2' })
  user_id!: string;

  @ApiProperty({ example: 'jane@example.com' })
  email!: string;

  @ApiProperty({ example: 'USER' })
  role!: string;

  @ApiProperty({ type: UserProfileDto })
  profile!: UserProfileDto;

  @ApiProperty({ example: 'Registration successful' })
  message!: string;
}
