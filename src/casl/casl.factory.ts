import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import Role from 'src/users/role.enum';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'all' | 'Post';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslFactory {
  defineAbility(user: any): AppAbility {
    const { can, cannot, rules } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability);

    switch (user?.role) {
      case Role.Admin:
        can('manage', 'all'); // Admin can do everything
        break;
      case Role.Editor:
        can('create', 'Post');
        can('read', 'Post');
        can('update', 'Post');
        cannot('delete', 'Post'); // Editor cannot delete
        break;
      case Role.User:
        can('read', 'Post'); // Users can only read
        cannot('create', 'Post');
        cannot('update', 'Post');
        cannot('delete', 'Post');
        break;
      default:
        can('read', 'Post'); // Default to read-only
        break;
    }

    return new Ability(rules);
  }
}
