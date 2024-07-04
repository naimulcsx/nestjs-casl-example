import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import jwtConfig from '../config/jwt.config';
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    /**
     * Global Jwt auth guard that applies to all routes
     * Learn more: https://docs.nestjs.com/guards#binding-guards
     */
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
