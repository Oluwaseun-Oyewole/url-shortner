import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity';

export class UserResponse {
  @ApiProperty({ default: '5a7bfed6-86f0-4d95-b114-f4581c67300c' })
  id: number;

  @ApiProperty({ default: 'John Doe' })
  fullname: string;

  @ApiProperty({ default: 'JohnDoe@gmail.com' })
  email: string;

  password: string;

  @ApiProperty({ type: Date, required: false })
  lastLoginDate: Date;

  @ApiProperty()
  activatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.email = user.email;
    this.activatedAt = user.activatedAt;
    this.lastLoginDate = user.lastLoginDate;
    this.createdAt = user.createdAt;
  }
}
