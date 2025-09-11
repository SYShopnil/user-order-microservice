import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entity/user_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
