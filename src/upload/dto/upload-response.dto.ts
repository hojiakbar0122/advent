import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({ example: 'Rasm muvaffaqiyatli yuklandi' })
  message: string;

  @ApiProperty({
    example: {
      id: 1,
      url: '/uploads/1694539200000.png',
    },
  })
  upload: {
    id: number;
    url: string;
  } | null;
}
