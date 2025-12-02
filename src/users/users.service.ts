import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyAccountDto } from 'src/auth/dto/auth.dto';
import { hashPassword } from 'src/shared/utils/index.utils';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: CreateUserDto) {
    try {
      const { email, password } = input;
      const userExists = await this.userRepository.findOne({
        where: { email },
      });
      if (userExists)
        throw new ConflictException(
          `User with ${userExists.email} already exists.`,
        );
      const hashedPassword = await hashPassword(password);
      const savedUser = this.userRepository.create({
        ...input,
        password: hashedPassword,
      });
      await this.userRepository.save(savedUser);
      return new UserResponse(savedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async verifyUser(input: verifyAccountDto) {
    try {
      const { email } = input;
      const userExists = await this.userRepository.findOne({
        where: { email },
      });
      if (!userExists) Promise.reject('User not found');

      await this.userRepository.update(
        { id: userExists.id },
        {
          activatedAt: new Date(),
        },
      );
      return await this.userRepository.findOne({
        where: { id: userExists.id },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async checkIfUserExists(input: Partial<LoginDto>) {
    const userExists = await this.userRepository.findOne({
      where: { email: input.email },
    });
    return userExists && new UserResponse(userExists);
  }

  async getUserWithPassword(
    input: Partial<Record<'password' | 'email', string>>,
  ) {
    const user = await this.userRepository.findOne({
      where: { password: input.password, email: input.email },
    });
    return user && new UserResponse(user);
  }
}
