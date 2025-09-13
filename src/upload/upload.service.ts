import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Upload } from './model/upload.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Upload) private readonly uploadModel: typeof Upload,
  ) {}

  async saveFileUrl(filename: string) {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const url = `${appUrl}/uploads/${filename}`;

    // Database'ga yozish
    const image = await this.uploadModel.create({ url } as any);

    return image; // { id, url, createdAt, updatedAt }
  }

  async deleteFile(id: number): Promise<{ message: string }> {
    // Avval DB dan yozuvni topamiz
    const file = await this.uploadModel.findByPk(id);
    if (!file) {
      throw new NotFoundException('Rasm topilmadi');
    }

    // URL dan filename ajratib olish
    const filename = path.basename(file.url);
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Fayl tizimidan o‘chirish (agar mavjud bo‘lsa)
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }

    // DB dan o‘chirish
    await file.destroy();

    return { message: 'Rasm muvaffaqiyatli o‘chirildi' };
  }
}
