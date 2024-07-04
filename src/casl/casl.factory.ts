import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'all' | 'Post';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslFactory {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async defineAbility(user: any): Promise<AppAbility> {
    const { can, rules } = new AbilityBuilder<Ability<[Actions, Subjects]>>(
      Ability,
    );

    if (user) {
      const role = await this.rolesRepository.findOne({
        where: { name: user.role },
        relations: ['permissions'],
      });
      if (role) {
        role.permissions.forEach((permission) => {
          if (permission.conditions) {
            can(
              permission.action as Actions,
              permission.subject as Subjects,
              permission.conditions,
            );
          } else {
            can(permission.action as Actions, permission.subject as Subjects);
          }
        });
      }
    }

    return new Ability(rules);
  }
}
