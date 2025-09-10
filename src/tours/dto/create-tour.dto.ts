import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTourDto {
  @ApiProperty({ example: 'Amazing Bukhara Tour', description: 'Tour title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A 5-day trip exploring Bukhara...', description: 'Tour description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 199.99, description: 'Tour price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'bukhara.jpg', description: 'Tour image URL', required: false })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({ example: 5, description: 'Number of days' })
  @IsNumber()
  days: number;

  @ApiProperty({ example: 'https://example.com/tour', description: 'Tour booking link', required: false })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ example: 'Uzbekistan', description: 'Tour country' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'Bukhara', description: 'Tour region', required: false })
  @IsString()
  @IsOptional()
  region?: string;
}
