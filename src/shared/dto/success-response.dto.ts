import { ApiProperty } from '@nestjs/swagger';

export class APISuccessResponse<TData = unknown> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  payload: TData;
}

export class APISSuccessResponsePaginated<TData = any> {
  @ApiProperty()
  success: boolean;
  payload: TData;
}
