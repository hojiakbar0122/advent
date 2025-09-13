import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UploadResponseDto } from './dto/upload-response.dto';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Rasm yuklash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        img: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Rasm muvaffaqiyatli yuklandi',
    type: UploadResponseDto,
  })
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      return { message: 'Rasm topilmadi', upload: null };
    }

    const upload = await this.uploadService.saveFileUrl(file.filename);

    return {
      message: 'Rasm muvaffaqiyatli yuklandi',
      upload,
    };
  }

  // 🗑 DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Rasmni o‘chirish (DB + Fayl tizimidan)' })
  @ApiParam({ name: 'id', example: 1 })
  async deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.uploadService.deleteFile(id);
  }
}
