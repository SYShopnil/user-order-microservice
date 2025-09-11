import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('auth_user')
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token_hash!: string | null;

  @ManyToOne(() => Role, (r) => r.users, { cascade: true })
  role!: Role;
}
