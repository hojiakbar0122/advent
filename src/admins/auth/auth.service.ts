import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AdminsService } from "../admins.service";
import { Admin } from "../models/admin.model";
import { CreateAdminDto } from "../dto/create-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
      email: admin.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createAdminDto: CreateAdminDto) {
    const doctor = await this.adminsService.findByEmail(createAdminDto.email);
    if (doctor) {
      throw new ConflictException({
        message: "Bunday Emailli Admin mavjud",
      });
    }
    const newAdmin = await this.adminsService.create(createAdminDto);
    return { message: "Admin qo'shildi", adminId: newAdmin.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const admin = await this.adminsService.findByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException({ message: "Email yoki Password Notgiri" });
    }
    if (!admin.is_active) {
      throw new BadRequestException({ message: "Avval Emailni Tasdiqlang" });
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      admin.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({ message: "Email yoki Password Notgiri" });
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    await admin.save();
    return { message: "Tizimga hush kelibsiz", accessToken };
  }

  async signOut(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!adminData) {
      throw new ForbiddenException("Admin not verified");
    }

    const refresh_token = null;
    await this.adminsService.updateRefreshToken(
      adminData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Admin logged out successfully",
    };

    return response;
  }

  async refreshToken(adminId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (adminId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }

    const admin = await this.adminsService.findOne(adminId);

    if (!admin || !admin.refresh_token) {
      throw new BadRequestException("Admin not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      admin.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    await this.adminsService.updateRefreshToken(admin.id, refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message:"Admin refreshed",
      adminId:admin.id,
      access_token:accessToken
    }

    return response
  }
}
