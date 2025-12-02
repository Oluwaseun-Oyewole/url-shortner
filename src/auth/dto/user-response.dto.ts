import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/entity';

class AuthTokensDto {
  @ApiProperty({
    default:
      'd19a3633857813f135b9cecb5057a7064fe128b2369349d64f72d441650b366b4',
  })
  accessToken: string;

  @ApiProperty({
    default:
      'd19a3633857813f135b9cecb5057a7064fe128b2369349d64f72d441650b366b4',
  })
  refreshToken: string;
}

export class UserAuthResponseDto {
  @ApiProperty({ type: AuthTokensDto })
  tokens: AuthTokensDto;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  constructor(data: {
    tokens: Record<'accessToken' | 'refreshToken', string>;
    user: User | UserResponse;
  }) {
    this.tokens = data.tokens;
    this.user =
      data.user instanceof UserResponse
        ? data.user
        : new UserResponse(data.user);
  }
}
