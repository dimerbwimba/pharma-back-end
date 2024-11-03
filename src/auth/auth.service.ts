// src/modules/auth/auth.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(userDTO: CreateUserDto): Promise<any> {
    const { username, email, password, role } = userDTO;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default to Role.user if no role provided
    const userRole = role || Role.user;

    // Default role to 'user'
    try {
      const user = await this.databaseService.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: userRole,
        },
      });

      return user;
    } catch (error) {
      // Check if error is a Prisma unique constraint violation
      if (error.code === 'P2002') {
        if (error.meta?.target.includes('email')) {
          throw new ConflictException('Email is already in use');
        }
        if (error.meta?.target.includes('username')) {
          throw new ConflictException('Username is already in use');
        }
      }
      // Re-throw any other errors
      throw error;
    }
  }
  // Method to validate user credentials during login
  async validateUser(loginDto: LoginDto): Promise<any | null> {
    const { email, password } = loginDto;

    // Find the user by email
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if the password is correct
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  // Login method using validateUser
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto); // Add a validation method
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
