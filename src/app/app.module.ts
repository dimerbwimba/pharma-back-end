import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
    imports:[
        DatabaseModule,
        AuthModule,
        PermissionModule
    ]
})
export class AppModule {}
