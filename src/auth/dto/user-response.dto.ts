import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/entity';

class AuthTokensDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class UserAuthResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: AuthTokensDto })
  tokens: AuthTokensDto;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  constructor(data: {
    message: string;
    tokens: Record<'accessToken' | 'refreshToken', string>;
    user: User | UserResponse;
  }) {
    ((this.message = data.message), (this.tokens = data.tokens));
    this.user =
      data.user instanceof UserResponse
        ? data.user
        : new UserResponse(data.user);
  }
}
