import { BadRequestException, Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.findOne(signUpDto.username);
    if (user) {
      throw new BadRequestException('Username already used');
    }
    const newUser = await this.usersService.create(signUpDto);
    return newUser;
  }

  private async signToken<T>(userId: number, payload?: T) {
    return this.jwtService.signAsync({
      sub: userId,
      ...payload,
    });
  }

  async generateTokens(userId: number) {
    const user = await this.usersService.findById(userId);
    const accessToken = await this.signToken(user.id, {
      username: user.username,
      role: user.role,
    });
    return {
      accessToken,
    };
  }
}
