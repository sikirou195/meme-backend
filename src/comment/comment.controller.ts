import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CommentService } from './comment.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentService.create(
      dto,
      req.user.userId,
    );
  }

  @Get(':memeId')
  findByMeme(
    @Param('memeId') memeId: string,
  ) {
    return this.commentService.findByMeme(
      Number(memeId),
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(
      +id,
      updateCommentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}