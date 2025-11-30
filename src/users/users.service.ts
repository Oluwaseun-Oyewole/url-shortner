import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/shared/utils/index.utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
      return new UserResponse(savedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
