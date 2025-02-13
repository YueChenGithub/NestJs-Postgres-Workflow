import { Module } from '@nestjs/common';
import { OrchestrationsService } from './orchestrations.service';
import { OrchestrationsController } from './orchestrations.controller';

@Module({
  controllers: [OrchestrationsController],
  providers: [OrchestrationsService],
})
export class OrchestrationsModule {}
