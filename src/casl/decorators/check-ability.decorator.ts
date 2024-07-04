import { SetMetadata } from '@nestjs/common';
import { Actions, Subjects } from '../casl.factory';

export const CHECK_ABILITY = 'check_ability';

export interface RequiredRule {
  action: Actions;
  subject: Subjects;
}

export const CheckAbility = (action: Actions, subject: Subjects) =>
  SetMetadata(CHECK_ABILITY, [{ action, subject }]);
