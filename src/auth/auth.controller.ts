import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from 'src/shared/decorators/swagger.decorators';
import { CreateUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';
import { UserAuthResponseDto } from './dto';

@ErrorApiResponse()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SuccessApiResponse(UserAuthResponseDto, { status: 201 })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Register Example',
        value: {
          fullname: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
      },
    },
  })
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body).catch((error) => {
      throw new BadRequestException(error?.message || error, { cause: error });
    });
  }
}
