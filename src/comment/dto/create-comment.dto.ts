import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Très drôle 😂',
  })
  content: string;

  @ApiProperty({
    example: 1,
  })
  memeId: number;
}