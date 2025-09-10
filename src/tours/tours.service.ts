import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Tour } from './models/tour.model';
import { Attributes } from 'sequelize';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour) // Sequelize modelini inject qilish
    private readonly tourModel: typeof Tour,
  ) {}

  // CREATE
  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const tour = await this.tourModel.create(createTourDto as Attributes<Tour>);
    return tour;
  }

  // FIND ALL
  async findAll(): Promise<Tour[]> {
    return this.tourModel.findAll();
  }

  // FIND ONE
  async findOne(id: number): Promise<Tour> {
    const tour = await this.tourModel.findByPk(id);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    return tour;
  }

  // UPDATE
  async update(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
    const tour = await this.findOne(id); // mavjudligini tekshiramiz
    return tour.update(updateTourDto);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const tour = await this.findOne(id);
    await tour.destroy();
  }
}
