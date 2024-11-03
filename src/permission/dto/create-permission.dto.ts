import { IsString } from "class-validator";

export class createPermissionDto{
    @IsString()
    action:string;

    @IsString()
    ressources:string
}