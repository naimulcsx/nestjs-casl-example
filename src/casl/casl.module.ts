import { Global, Module } from '@nestjs/common';

import { CaslFactory } from './casl.factory';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './guards/abilities.guard';

@Global()
@Module({
  providers: [CaslFactory, { provide: APP_GUARD, useClass: AbilitiesGuard }],
  exports: [CaslFactory],
})
export class CaslModule {}
