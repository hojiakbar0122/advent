import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class SignInDto{
    @ApiProperty({ example: 'admin@example.com' })
    @IsEmail()
    email:string

    @ApiProperty({ example: 'admin!password' }) 
    @IsString()
    @MinLength(6)
    password:string
}