import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Action, Resource } from './type/prisma.enums';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findPermissions() {
    const permission = await this.databaseService.permission.findMany();
    return permission;
  }

  async createPermission(action: Action, resource: Resource) {
    const permission = await this.databaseService.permission.create({
      data: {
        action,
        resource,
      },
    });
    return permission;
  }

  async assignPermissionToUser(userId: string, action: Action, resource: Resource) {
    try {
      // Check if the permission already exists
      let permission = await this.databaseService.permission.findFirst({
        where: { action, resource },
      });

      // If the permission doesn't exist, create it
      if (!permission) {  
        permission = await this.databaseService.permission.create({
          data: { action, resource },
        });

        if (!permission || !permission.id) {
          throw new InternalServerErrorException('Failed to create permission.');
        }
      }

      // Create the UserPermission entry to link the user and permission
      const userPermission = await this.databaseService.userPermission.create({
        data: {
          userId,
          permissionId: permission.id,
        },
      });

      return userPermission

      

    } catch (error) {
      // Handle Prisma validation errors
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid data provided for permission assignment.');
      }
      throw new InternalServerErrorException('An error occurred while assigning permission.');
    }
  }
 
}
