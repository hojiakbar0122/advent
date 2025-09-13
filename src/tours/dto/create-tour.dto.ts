import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUrl,
  IsEnum,
  IsBoolean,
  isNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// ===== Nested DTOs =====

export class TourImageDto {
  @ApiProperty({ example: 'https://example.com/main.jpg' })
  @IsString()
  imgUrl: string;

  @ApiProperty({ example: 'https://example.com/thumb.jpg' })
  @IsString()
  thrumbnail: string;

  @ApiProperty({ example: 'Uzbekistan tour main image' })
  @IsString()
  alt: string;
}

export class TourItineraryDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  day: number;

  @ApiProperty({ example: 'Arrival in Tashkent' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Arrival and transfer to the hotel.' })
  @IsString()
  description: string;
}

export class TourPriceDto {
  @ApiProperty({ example: 1240 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'from', enum: ['full', 'from'] })
  @IsEnum(['full', 'from'])
  type: 'full' | 'from';

  @ApiProperty({ type: [String], example: ['Transfer included'] })
  @IsArray()
  @IsString({ each: true })
  includes: string[];

  @ApiProperty({ type: [String], example: ['Flights not included'] })
  @IsArray()
  @IsString({ each: true })
  doesntIncludes: string[];
}

export class TourDateDto {
  @ApiProperty({ example: '2025-10-03' })
  @IsString()
  fromDate: string;

  @ApiProperty({ example: '2025-10-10' })
  @IsString()
  toDate: string;

  @ApiProperty({ example: 'avaible', enum: ['solduot', 'avaible', 'ongoing', 'finished'] })
  @IsEnum(['solduot', 'avaible', 'ongoing', 'finished'])
  status: 'solduot' | 'avaible' | 'ongoing' | 'finished';

  @ApiProperty({ example: 1390 })
  @IsNumber()
  price: number;
}

export class TourTariffPriceDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  person: number;

  @ApiProperty({ example: 1390 })
  @IsNumber()
  amount: number;
}

export class TourTariffDto {
  @ApiProperty({ example: 'Standard' })
  @IsString()
  tariffName: string;

  @ApiProperty({ type: [TourTariffPriceDto] })
  @ValidateNested({ each: true })
  @Type(() => TourTariffPriceDto)
  tariffPrices: TourTariffPriceDto[];

  @ApiProperty({ example: 250 })
  @IsNumber()
  singleSuppliment: number;
}

export class TourDatePriceDto {
  @ApiProperty({ type: [TourDateDto] })
  @ValidateNested({ each: true })
  @Type(() => TourDateDto)
  dates: TourDateDto[];

  @ApiProperty({ example: true })
  @IsBoolean()
  hasTariff: boolean;

  @ApiProperty({ type: [TourTariffDto] })
  @ValidateNested({ each: true })
  @Type(() => TourTariffDto)
  traiffDto: TourTariffDto[];

  @ApiProperty({ type: [String], example: ['Tour is confirmed even for 1 traveler.'] })
  @IsArray()
  @IsString({ each: true })
  infos: string[];
}

export class TourAccommodationDto {
  @ApiProperty({ example: 'Tashkent' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2 nights' })
  @IsString()
  nights: string;

  @ApiProperty({ example: 'Hotel description' })
  @IsString()
  description: string;
}

export class TourReviewDto {
  @ApiProperty({ example: 'Ivan Butsenko' })
  @IsString()
  author: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'May 2025' })
  @IsString()
  visited: string;

  @ApiProperty({ example: 'Everything was well-planned and amazing!' })
  @IsString()
  description: string;
}

// ===== Main DTO =====

export class CreateTourDto {
  @ApiProperty({ example: '8-Day Classic Group Tour in Uzbekistan 2025–2027' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Enjoy a journey through ancient cities of Central Asia...' })
  @IsString()
  description: string;

  @ApiProperty({ example: 8 })
  @IsNumber()
  days: number;

  @ApiProperty({ type: [TourImageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourImageDto)
  imgUrls: TourImageDto[];

  @ApiProperty({ example: 'Historical' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 'https://youtube.com/demo-tour-video' })
  @IsOptional()
  @IsUrl()
  youtubeLink?: string;

  @ApiProperty({ type: [TourItineraryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourItineraryDto)
  itinerary: TourItineraryDto[];

  @ApiProperty({ type: TourPriceDto })
  @ValidateNested()
  @Type(() => TourPriceDto)
  price: TourPriceDto;

  @ApiProperty({ type: TourDatePriceDto })
  @ValidateNested()
  @Type(() => TourDatePriceDto)
  datePrices: TourDatePriceDto;

  @ApiProperty({ type: [TourAccommodationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourAccommodationDto)
  accomodation: TourAccommodationDto[];

  @ApiProperty({ type: [TourReviewDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourReviewDto)
  reviews: TourReviewDto[];

  @ApiProperty({ type: [String], example: ['Group size: 1–16 people'] })
  @IsArray()
  @IsString({ each: true })
  tourInfos: string[];

  @ApiProperty({ type: [String], example: ['Spring', 'Summer'] })
  @IsArray()
  @IsString({ each: true })
  seasons: string[];

  @ApiProperty({ type: [String], example: ['Tashkent', 'Samarkand'] })
  @IsArray()
  @IsString({ each: true })
  routes: string[];
}
