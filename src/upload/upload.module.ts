import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Upload } from './model/upload.model';

@Module({
  imports:[SequelizeModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService],
  exports:[UploadService]
})
export class UploadModule {}
