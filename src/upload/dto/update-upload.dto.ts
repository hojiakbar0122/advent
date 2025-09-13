import { PartialType } from '@nestjs/swagger';
import { UploadResponseDto } from './upload-response.dto';

export class UpdateImageDto extends PartialType(UploadResponseDto) {}
