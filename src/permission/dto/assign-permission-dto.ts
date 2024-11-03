import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Action, Resource } from "../type/prisma.enums";

export class assignPermissionDto{
    @IsNotEmpty()
    @IsString()
    userId: string;
    
    @IsNotEmpty()
    @IsEnum(Action) 
    action: Action; 

    @IsNotEmpty()
    @IsEnum(Resource)
    resource: Resource
}
