import { Body, Controller, Get, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Roles } from './decorator/role.decorator';
import { createPermissionDto } from './dto/create-permission.dto';
import { Role , Action,Resource} from './type/prisma.enums'; 
import { assignPermissionDto } from './dto/assign-permission-dto';
@Controller('permission-secure')
export class PermissionController {
    constructor ( private readonly permissionService:PermissionService){}
    @Get()
    async findAllPermissions(){
        const permissions = await this.permissionService.findPermissions()
        return permissions
    }

    @Post("create-premission")
    async createPermission(
        @Body() createPermissionDto: { action: Action; resource: Resource },
    ){
        const { action, resource } = createPermissionDto;
        const permission = await this.permissionService.createPermission(action,resource)
        return {
            message:"Permission created successfully",
            permission,
        }
    }

    @Post("assign-user-permission")
    async assignPermissionToUser(@Body() AssignPermissionDto:assignPermissionDto){
        const { action,resource,userId}= AssignPermissionDto
        const permission = await this.permissionService.assignPermissionToUser(
            userId,action,resource
        )
        return {
            message: 'Permission assigned successfully',
            permission,
          };
    }
}
