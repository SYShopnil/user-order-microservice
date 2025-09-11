import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ERoleName } from '../enums';

export class RegisterDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
  @IsString() display_name!: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() role?: ERoleName;
}

export class LoginDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
}
