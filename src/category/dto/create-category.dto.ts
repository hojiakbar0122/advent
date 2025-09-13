import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Technology',
    description: 'Category nomi (majburiy)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Category nomi bo‘sh bo‘lmasligi kerak' })
  @Length(2, 50, { message: 'Category nomi 2-50 ta belgidan iborat bo‘lishi kerak' })
  name: string;

  @ApiProperty({
    example: 'Texnologiya bilan bog‘liq maqolalar va yangiliklar',
    description: 'Category haqida izoh (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 255, { message: 'Description 255 belgidan oshmasligi kerak' })
  description?: string;
}
