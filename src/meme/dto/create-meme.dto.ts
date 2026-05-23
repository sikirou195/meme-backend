import { ApiProperty } from '@nestjs/swagger';

export class CreateMemeDto {
  @ApiProperty({
    example: 'meme.png',
  })
  imageUrl: string;

  @ApiProperty({
    example: 'Quand le prof parle',
    required: false,
  })
  topText?: string;

  @ApiProperty({
    example: 'Moi en TD',
    required: false,
  })
  bottomText?: string;

  @ApiProperty({
    example: 1,
  })
  userId: number;
}