import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  Put, UseGuards
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Tour } from './models/tour.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  // Tour yaratish (asosiy + child-lar bilan)
  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new tour (with child data)' })
  @ApiResponse({ status: 201, description: 'Tour successfully created', type: Tour })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  // Barcha tourlarni olish
  @Get()
  @ApiOperation({ summary: 'Get all tours (with relations)' })
  @ApiResponse({ status: 200, description: 'List of tours', type: [Tour] })
  findAll() {
    return this.toursService.findAll();
  }

  // Bitta tourni olish
  @Get(':id')
  @ApiOperation({ summary: 'Get a single tour by ID (with relations)' })
  @ApiParam({ name: 'id', type: Number, description: 'Tour ID' })
  @ApiResponse({ status: 200, description: 'Tour found', type: Tour })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  // Tour yangilash
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a tour by ID (with child data)' })
  @ApiParam({ name: 'id', type: Number, description: 'Tour ID' })
  @ApiResponse({ status: 200, description: 'Tour updated successfully', type: Tour })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  // Tour o‘chirish
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tour by ID (cascade delete child data)' })
  @ApiParam({ name: 'id', type: Number, description: 'Tour ID' })
  @ApiResponse({ status: 200, description: 'Tour deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
