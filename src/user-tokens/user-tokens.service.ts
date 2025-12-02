import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyAccountDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { TOKEN_TYPES, UserToken } from './entity';

@Injectable()
export class UserTokensService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  async savedUserToken(input: {
    id: string | any;
    token: string;
    tokenExpires: Date;
    type: TOKEN_TYPES;
  }) {
    const isTokenExists = await this.userTokenRepository.findOne({
      where: { user: { id: input.id } },
    });

    if (isTokenExists) {
      await this.userTokenRepository.delete({ user: { id: input.id } });
    }
    const userToken = await this.userTokenRepository.create({
      user: { id: input.id },
      token: input.token,
      expires: input.tokenExpires,
      type: input.type,
    });
    return await this.userTokenRepository.save(userToken);
  }

  async validateUserToken(input: {
    id: string | any;
    token: string;
    tokenExpires: Date;
    type: TOKEN_TYPES;
  }) {
    try {
      const userToken = await this.userTokenRepository.findOne({
        where: { user: input.id, token: input.token, type: input.type },
      });

      if (!userToken) Promise.reject('Invalid token');
      if (new Date().getTime() > new Date(userToken.expires).getTime()) {
        return Promise.reject('Token EXpired');
      }
      return userToken;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async checkEmailTokenIsValid(input: verifyAccountDto) {
    const { token } = input;
    try {
      const tokenExists = await this.userTokenRepository.findOne({
        where: { token },
      });
      if (!tokenExists) return Promise.reject('Invalid Token');
      if (new Date().getTime() > new Date(tokenExists.expires).getTime())
        return Promise.reject('Token Expired');
      return tokenExists;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteAllUserToken(input: { id: string | any }) {
    return await this.userTokenRepository
      .delete({ user: { id: input.id } })
      .then(() => Promise.resolve(true))
      .catch((error) => Promise.reject(error));
  }
}
