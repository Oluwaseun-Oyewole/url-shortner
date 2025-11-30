import { Injectable } from '@nestjs/common';
import { MailService } from 'src/integration-services/mail/mail.service';
import { appConfig } from 'src/shared/config';
import { generateLongToken } from 'src/shared/utils/index.utils';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async register(data: CreateUserDto) {
    const savedUser = await this.userService.createUser({ ...data });
    const emailVerificationToken = generateLongToken();
    const emailVerificationLink = `${appConfig().appLink}/verify/?token=${emailVerificationToken}&email=${savedUser.email}`;

    await this.mailService.registrationEmail({
      to: data.email,
      name: data.fullname,
      link: emailVerificationLink,
    });

    return { message: 'Registration successful', user: savedUser };
  }
}
