// src/prisma.enums.ts

// Enum representing the different resources on which actions can be performed
export enum Resource {
    USER = 'USER',
    PHARMACY_RECORD = 'PHARMACY_RECORD',
    INVENTORY = 'INVENTORY',
    REPORT = 'REPORT',
  }
  
  // Enum representing the different types of actions that can be performed
  export enum Action {
    READ = 'READ',
    WRITE = 'WRITE',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
  }
  
  // Enum representing the different roles users can have in the system
  export enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user',
  }
  