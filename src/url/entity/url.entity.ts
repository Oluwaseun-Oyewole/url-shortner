import { appConfig } from 'src/shared/config';
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

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  shortCode: string;

  @Column()
  originalUrl: string;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => User, (user) => user.urls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get shortUrl(): string {
    return `${appConfig().appLink}/${this.shortCode}`;
  }
}
