import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AuthUser } from './auth-user.entity';
import { ERoleName } from '../enums';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: ERoleName,
  })
  name!: ERoleName;

  @OneToMany(() => AuthUser, (u) => u.role, { onDelete: 'CASCADE' })
  users!: AuthUser[];
}
