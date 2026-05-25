import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({
    example: 'Drake Meme',
  })
  title: string;

  @ApiProperty({
    example: 'https://i.imgflip.com/30b1gx.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    example: 'Trending',
  })
  category?: string;

  @ApiProperty({
    example: false,
  })
  premium?: boolean;
}