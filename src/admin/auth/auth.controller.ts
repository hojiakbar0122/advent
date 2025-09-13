import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { type Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("admin-auth") // Swagger bo'limi
@Controller("admin")
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  // ========== LOGIN ==========
  @Post("login")
  @ApiOperation({ summary: "Admin login qilish" })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli login qildi" })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(signInDto, res);
  }

  // ========== LOGOUT ==========
  @HttpCode(200)
  @Post("logout")
  @ApiOperation({ summary: "Admin logout qilish" })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli chiqdi" })
  @ApiResponse({ status: 401, description: "Token noto‘g‘ri yoki topilmadi" })
  logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(refreshToken, res);
  }

  // ========== REFRESH TOKEN ==========
  @HttpCode(200)
  @Post(":id/refresh")
  @ApiOperation({ summary: "Refresh token orqali yangi access token olish" })
  @ApiResponse({ status: 200, description: "Yangi access token qaytarildi" })
  @ApiResponse({ status: 401, description: "Refresh token noto‘g‘ri yoki eskirgan" })
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
