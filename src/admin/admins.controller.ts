import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { AdminLevel } from "../common/decorators/admin-level.decorator";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@ApiTags("admin") // Swagger group nomi
@Controller("admin")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin qo‘shish (faqat SuperAdmin)" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  // @AdminLevel("super")
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish (faqat SuperAdmin)" })
  @ApiResponse({ status: 200, description: "Adminlar ro‘yxati qaytariladi" })
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta adminni olish" })
  @ApiResponse({ status: 200, description: "Admin topildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(":id")
  @ApiOperation({ summary: "Admin ma’lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Admin yangilandi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(":id")
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.adminsService.resetPassword(resetPasswordDto);
  }

  // @Get("activate/:link")
  // @ApiOperation({ summary: "Email orqali adminni aktivlashtirish" })
  // @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli aktivlashtirildi" })
  // @ApiResponse({ status: 400, description: "Activation link noto‘g‘ri yoki aktiv bo‘lgan" })
  // async activateAdmin(@Param("link") link: string) {
  //   if (!link) {
  //     throw new BadRequestException("Activation link not found");
  //   }
  //   return this.adminsService.activateAdmin(link);
  // }
}
