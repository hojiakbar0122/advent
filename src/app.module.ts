import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tour } from './tours/models/tour.model';
import { ToursModule } from './tours/tours.module';
import { Admin } from './admin/models/admin.model';
import { AdminsModule } from './admin/admins.module';
import { AuthModule } from './admin/auth/auth.module';
import { Upload } from './upload/model/upload.model';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/model/category.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [Tour,Admin, Upload, Category],
      autoLoadModels: true,
      sync: { alter:true},
      logging: false,
    }),
    ToursModule,
    AdminsModule,
    AuthModule,
    UploadModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
