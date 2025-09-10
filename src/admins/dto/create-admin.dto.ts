import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEmail,
  MinLength,
  Matches,
  IsPhoneNumber,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali', description: 'Adminning ismi' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Valiyev', description: 'Adminning familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Adminning telefon raqami' })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Adminning email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin123',
    description: 'Parol kamida 6 ta belgidan iborat bo‘lib, katta harf va raqam bo‘lishi kerak',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one uppercase letter and one number',
  })
  password: string;

  @ApiProperty({ example: 'Admin123', description: 'Parolni tasdiqlash (oddiy string tekshiruv)' })
  @IsString()
  confirm_password: string;

  @ApiProperty({ example: true, description: 'Admin yaratuvchimi yoki yo‘q' })
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({ example: true, description: 'Admin aktiv holatdami' })
  @IsBoolean()
  is_active: boolean;
}
