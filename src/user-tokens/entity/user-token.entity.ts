import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TOKEN_TYPES {
  FORGOT_PASSWORD = 'forgotPassword',
  RESET_PASSWORD = 'resetpassword',
  EMAIL_VERIFICATION = 'emailVerification',
}

@Entity('UserTokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 500 })
  token: string;

  @Column({ type: 'timestamp' })
  expires: Date;

  @Column()
  type: TOKEN_TYPES;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  isExpired(): boolean {
    return new Date() > this.expires;
  }

  isValid(): boolean {
    return !this.isExpired();
  }
}
