import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { PermissionController } from './controllers/permission/permission.controller';
import { RoleController } from './controllers/role/role.controller';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { RefreshToken, User } from './entities';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './services/permission/permission.service';
import { RoleService } from './services/role/role.service';
import { PermissionProfile } from './mapper/permission/permission.profile';
import { RoleProfile } from './mapper/role/role.profile';
import { UserProfile } from './mapper/user/user.profile';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, RefreshToken]),
    JwtModule.register({}),
    PassportModule.register({
      session: false,
    }),
  ],
  controllers: [
    UserController,
    AuthController,
    PermissionController,
    RoleController,
  ],
  providers: [
    UserService,
    AuthService,
    PermissionProfile,
    RoleProfile,
    UserProfile,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RoleService,
    PermissionService,
  ],
})
export class UserModule {}
