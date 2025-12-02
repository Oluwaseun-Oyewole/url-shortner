import { Exclude } from 'class-transformer';
import { Url } from 'src/url/entity/url.entity';
import { UserToken } from 'src/user-tokens/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullname: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  activatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Url, (url) => url.user, { cascade: true })
  urls: Url[];

  @OneToMany(() => UserToken, (token) => token.user, { cascade: true })
  tokens: UserToken[];
}
