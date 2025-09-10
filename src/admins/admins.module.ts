import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { AuthModule } from './auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Admin]), MailModule, JwtModule],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports:[AdminsService]
})
export class AdminsModule {}
