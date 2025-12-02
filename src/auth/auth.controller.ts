import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from 'src/shared/decorators/swagger.decorators';
import { CreateUserDto, LoginDto } from 'src/users/dto';
import { AuthService } from './auth.service';
import { UserAuthResponseDto, VerifyAuthResponseDto } from './dto';
import { verifyAccountDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ErrorApiResponse({ message: 'Invalid OTP', status: 400 })
  @SuccessApiResponse(UserAuthResponseDto, {
    status: 201,
    description: 'User created successfully - verification email sent',
    message:
      'User created successfully. Please check your email to verify your account.',
  })
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user in the system with provided details.',
  })
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

  @ApiOperation({ summary: 'User Login' })
  @SuccessApiResponse(UserAuthResponseDto)
  @ErrorApiResponse()
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Login Example',
        value: {
          email: 'john@example.com',
          password: 'password123',
        },
      },
    },
  })
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body).catch((error) => {
      throw new BadRequestException(error?.message || error, { cause: error });
    });
  }

  @ApiOperation({ summary: 'Verify User' })
  @ErrorApiResponse({ message: 'Invalid token' })
  @SuccessApiResponse(VerifyAuthResponseDto, {
    message: 'Account successfully activated',
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Verify Example',
        value: {
          email: 'john@example.com',
          token: 'password123',
        },
      },
    },
  })
  @Post('/verify')
  async verify(@Body() body: verifyAccountDto) {
    return await this.authService.verify(body).catch((error) => {
      throw new BadRequestException(error?.message || error, { cause: error });
    });
  }
}
