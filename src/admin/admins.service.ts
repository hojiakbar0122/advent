import { 
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcrypt";

import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
  ) {}

  // CREATE
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { password, confirm_password, email } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const existing = await this.adminModel.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException("Bunday email avval ro'yxatdan o'tgan");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    return this.adminModel.create({
      email,
      hashed_password,
    }as any);
  }

  // READ ALL
  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  // READ ONE
  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin ID=${id} topilmadi`);
    }
    return admin;
  }

  // UPDATE
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const [affectedRows] = await this.adminModel.update(updateAdminDto, { where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Admin ID=${id} yangilanmadi (topilmadi)`);
    }
    return this.findOne(id);
  }

  // DELETE
  async remove(id: number) {
    const deleted = await this.adminModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Admin ID=${id} o‘chirilmadi (topilmadi)`);
    }
    return { message: `Admin ID=${id} muvaffaqiyatli o‘chirildi` };
  }

  // FIND BY EMAIL
  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ where: { email } });
  }

  // UPDATE REFRESH TOKEN
  async updateRefreshToken(id: number, refresh_token: string) {
    const [affectedRows] = await this.adminModel.update(
      { refresh_token },
      { where: { id } }
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Admin ID=${id} yangilanmadi`);
    }

    return this.findOne(id);
  }

  // RESET PASSWORD
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, password, confirm_password } = resetPasswordDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const admin = await this.findByEmail(email);
    if (!admin) {
      throw new NotFoundException("Bunday email topilmadi");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    admin.hashed_password = hashed_password;
    await admin.save();

    return { message: "Parol muvaffaqiyatli yangilandi" };
  }
}
