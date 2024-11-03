import { SetMetadata } from '@nestjs/common';
import { Action, Resource } from '@prisma/client';

// Custom decorator to set permissions on endpoint
export const PERMISSION_KEY = 'permission'
export const Permission = (action: Action, resource: Resource) =>
  SetMetadata(PERMISSION_KEY, { action, resource });
