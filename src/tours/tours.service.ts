import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tour } from './models/tour.model';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour)
    private readonly tourModel: typeof Tour,
  ) {}

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const tour = await this.tourModel.create(createTourDto as any);
    return tour;
  }

   async findAll(page = 1, limit = 10, categoryId?: number) {
    const offset = (page - 1) * limit;

    const where: any = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const { rows: data, count: total } = await this.tourModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Tour> {
    const tour = await this.tourModel.findByPk(id);
    if (!tour) throw new NotFoundException(`Tour with ID ${id} not found`);
    return tour;
  }

  async update(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
    const tour = await this.findOne(id);
    await tour.update(updateTourDto as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const tour = await this.findOne(id);
    await tour.destroy();
  }
}
