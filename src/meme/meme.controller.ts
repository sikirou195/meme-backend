import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MemeService } from './meme.service';

@Controller('meme')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  // =========================================
  // UPLOAD + CREATE MEME (AUTH REQUIRED)
  // =========================================
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req,
  ) {
    const imageUrl = `https://meme-backend-o55w.onrender.com/uploads/${file.filename}`;

    return this.memeService.create({
      imageUrl,
      topText: body.topText,
      bottomText: body.bottomText,
      userId: req.user.userId, // ✅ lié à l'utilisateur connecté
    });
  }


  @UseGuards(JwtAuthGuard)
@Post('avatar')
@UseInterceptors(
  FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads',

      filename: (req, file, callback) => {
        const uniqueName =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9);

        callback(
          null,
          uniqueName + extname(file.originalname),
        );
      },
    }),
  }),
)
uploadAvatar(
  @UploadedFile() file: Express.Multer.File,
  @Req() req,
) {
  return this.memeService.uploadAvatar(
    req.user.userId,
    file.filename,
  );
}
  // =========================================
  // LIKE MEME
  // =========================================
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likeMeme(@Param('id') id: string) {
    return this.memeService.likeMeme(Number(id));
  }

  // =========================================
  // GET MY MEMES (USER CONNECTÉ)
  // =========================================
  @Get('gallery')
   findAll() {
  return this.memeService.findAll();
}
  @UseGuards(JwtAuthGuard)
  @Get()
  findMyMemes(@Req() req) {
    return this.memeService.findByUser(req.user.userId);
  }

  // =========================================
  // GET ONE MEME
  // =========================================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memeService.findOne(+id);
  }
@Patch(':id/publish')
@UseGuards(JwtAuthGuard)
publishMeme(
  @Param('id') id: string,
  @Req() req,
) {
  return this.memeService.publishMeme(
    Number(id),
    req.user.userId,
  );
}
  // =========================================
  // DELETE MEME
  // =========================================
  @Delete(':id')
@UseGuards(JwtAuthGuard)
remove(
  @Param('id') id: string,
  @Req() req,
) {
  return this.memeService.remove(
    +id,
    req.user.userId,
  );
}
}