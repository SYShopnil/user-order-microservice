import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entity/user_profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profiles: Repository<UserProfile>,
  ) {}

  async createOrUpdateProfile(payload: {
    user_id: string;
    email: string;
    display_name?: string;
  }) {
    let profile = await this.profiles.findOne({
      where: { user_id: payload.user_id },
    });
    if (!profile) {
      profile = this.profiles.create({
        user_id: payload.user_id,
        email: payload.email,
        display_name: payload.display_name ?? payload.email.split('@')[0],
        bio: null,
      });
    } else {
      profile.email = payload.email;
      profile.display_name = payload.display_name ?? profile.display_name;
    }
    return this.profiles.save(profile);
  }
}
