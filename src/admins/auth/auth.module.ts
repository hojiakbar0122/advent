import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminAuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminsModule } from "../admins.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    AdminsModule,
  ],
  controllers: [AdminAuthController],
  providers: [AuthService],
})
export class AuthModule {}
