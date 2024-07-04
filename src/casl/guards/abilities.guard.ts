import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslFactory } from '../casl.factory';
import {
  CHECK_ABILITY,
  RequiredRule,
} from '../decorators/check-ability.decorator';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslFactory: CaslFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const ability = await this.caslFactory.defineAbility(user);

    for (const rule of rules) {
      if (ability.cannot(rule.action, rule.subject)) {
        throw new ForbiddenException('Forbidden');
      }
    }

    return true;
  }
}
