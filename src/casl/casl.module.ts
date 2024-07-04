import { Global, Module } from '@nestjs/common';

import { CaslFactory } from './casl.factory';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './guards/abilities.guard';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [CaslFactory, { provide: APP_GUARD, useClass: AbilitiesGuard }],
  exports: [CaslFactory],
})
export class CaslModule {}
