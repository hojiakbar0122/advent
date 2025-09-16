import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Categories') // Swaggerda bo‘lim nomi chiqadi
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Yangi category yaratish' })
  @ApiResponse({ status: 201, description: 'Category muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Xato ma’lumot yuborildi' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha categorylarni olish' })
  @ApiResponse({ status: 200, description: 'Categorylar ro‘yxati' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali bitta categoryni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan category' })
  @ApiResponse({ status: 404, description: 'Category topilmadi' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Categoryni yangilash' })
  @ApiResponse({ status: 200, description: 'Category muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 404, description: 'Category topilmadi' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Categoryni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Category muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Category topilmadi' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
