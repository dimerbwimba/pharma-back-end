import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password:string;

    @IsEnum(Role)
    role?:Role
}