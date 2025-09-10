import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt";
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel:typeof Admin,
  private readonly mailService: MailService,
){}


  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMail(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.update(updateAdminDto, {where:{id}});
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}});
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async activateAdmin(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatePatient = await this.adminModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );

    if (!updatePatient[1][0]) {
      throw new BadRequestException("Admin already activated");
    }

    return {
      message: "Admin activated successfully",
      is_active: updatePatient[1][0].is_active,
    };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
      const updatedAdmin = await this.adminModel.update(
        {
          refresh_token,
        },
        { where: { id } }
      );
  
      return updatedAdmin;
  }

   
}
