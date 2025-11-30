import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: Date, required: false })
  lastLoginDate: Date;

  @ApiProperty()
  activatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.email = user.email;
    this.activatedAt = user.activatedAt;
    this.lastLoginDate = user.lastLoginDate;
  }
}
