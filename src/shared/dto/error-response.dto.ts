import { ApiProperty } from '@nestjs/swagger';

export class APIErrorResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ description: 'error message is a string' })
  message: string;

  @ApiProperty({ type: Date })
  timestamp: Date | string;
}
