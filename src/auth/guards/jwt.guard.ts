import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_TYPE_KEY, AuthType } from '../decorators/auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const authType = this.reflector.getAllAndOverride<AuthType>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (authType === AuthType.None) {
      return true;
    }
    return super.canActivate(context);
  }
}
