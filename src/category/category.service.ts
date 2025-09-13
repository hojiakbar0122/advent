import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  // CREATE
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto as any);
  }

  // READ ALL
  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  // READ ONE
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // UPDATE
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    return category.update(updateCategoryDto);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    const category = await this.findOne(id);
    await category.destroy();
    return { message: `Category with ID ${id} deleted successfully` };
  }
}
