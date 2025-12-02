import { ApiProperty } from '@nestjs/swagger';

export class APISuccessResponse<TData = unknown> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: TData;
}

export class APISSuccessResponsePaginated<TData = any> {
  @ApiProperty()
  success: boolean;
  data: TData;
}
