import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Auth, AuthType } from './decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @Auth(AuthType.None)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @ApiBody({ type: SignUpDto })
  async login(@Request() req) {
    return this.authService.generateTokens(req.user.id);
  }

  @Post('sign-up')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({ status: 201, description: 'Successfully registered' })
  @ApiBody({ type: SignUpDto })
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Successfully fetched profile' })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
