import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity('user_profile')
export class UserProfile {
  @PrimaryColumn({ type: 'uuid' })
  user_id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 120 })
  display_name!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string | null;
}
