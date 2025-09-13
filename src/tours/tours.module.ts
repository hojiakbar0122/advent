import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tour } from './models/tour.model';

@Module({
  imports:[SequelizeModule.forFeature([
    Tour
  ])],
  controllers: [ToursController],
  providers: [ToursService],
  exports:[ToursService]
})
export class ToursModule {}
