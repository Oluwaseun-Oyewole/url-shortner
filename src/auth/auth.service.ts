import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from 'src/integration-services/mail/mail.service';
import { appConfig } from 'src/shared/config';
import { generateLongToken } from 'src/shared/utils/index.utils';
import { TOKEN_TYPES } from 'src/user-tokens/entity';
import { UserTokensService } from 'src/user-tokens/user-tokens.service';
import { CreateUserDto, LoginDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { AccessJWTPayload } from './auth.interface';
import { verifyAccountDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userTokenService: UserTokensService,
  ) {}

  async register(data: CreateUserDto) {
    const savedUser = await this.userService.createUser({ ...data });
    const emailVerificationToken = generateLongToken();
    const emailVerificationLink = `${appConfig().appLink}/verify/?token=${emailVerificationToken}&email=${savedUser.email}`;
    const tokenExpires = new Date(new Date().getTime() + 15 * 60 * 1000);

    await this.userTokenService.savedUserToken({
      id: savedUser.id.toString(),
      token: emailVerificationToken,
      tokenExpires,
      type: TOKEN_TYPES.EMAIL_VERIFICATION,
    });

    await this.mailService.registrationEmail({
      to: data.email,
      name: data.fullname,
      link: emailVerificationLink,
    });

    const tokens = await this.getTokens({
      email: savedUser.email,
      name: savedUser.fullname,
      id: savedUser.id.toString(),
    });

    return {
      success: true,
      message:
        'User created successfully. Please check your email to verify your account',
      data: { tokens, user: savedUser },
    };
  }

  async login(input: LoginDto) {
    try {
      const user = await this.userService.checkIfUserExists({
        email: input.email,
      });

      if (!user) return Promise.reject('Invalid Credentials.');
      if (!user.activatedAt)
        return Promise.reject('Please activate your account.');
      const isPasswordMatches = await bcrypt.compare(
        input.password,
        user.password,
      );
      if (!isPasswordMatches) return Promise.reject('Invalid Credentials.');
    } catch (error) {
      Promise.reject(error);
    }
  }

  async verify(input: verifyAccountDto) {
    try {
      const isUserTokenValid =
        await this.userTokenService.checkEmailTokenIsValid(input);

      const userDetails = await this.userService.checkIfUserExists({
        email: input.email,
      });

      if (!isUserTokenValid) Promise.reject('Invalid token');
      if (!userDetails) throw new Error('User Does Not Exist');
      if (userDetails.activatedAt) throw new Error('User already activated');

      await this.userService.verifyUser(input);
      await this.userTokenService.deleteAllUserToken({
        id: userDetails.id.toString(),
      });
      return {
        success: true,
        message: 'Account successfully activated',
      };
    } catch (error) {
      Promise.reject(error);
    }
  }

  private async getTokens(
    payload: AccessJWTPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const token = crypto.randomBytes(36).toString('hex');
    const jti = crypto.createHash('sha256').update(token).digest('hex');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: appConfig().jwtSecretKey,
        jwtid: jti,
        expiresIn: appConfig().accessTokenExpires,
        issuer: appConfig().appName,
      }),
      this.jwtService.signAsync(
        { id: payload.id },
        {
          secret: appConfig().jwtRefreshSecretKey,
          jwtid: jti,
          expiresIn: appConfig().refreshTokenExpires,
          issuer: appConfig().appName,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async verifyJWTToken(token: string) {
    try {
      const payload: AccessJWTPayload & { jti: string } =
        await this.jwtService.verifyAsync(token, {
          secret: appConfig().jwtSecretKey,
          issuer: appConfig().appName,
        });
      if (!payload) throw new ForbiddenException('Invalid token');

      return payload;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
