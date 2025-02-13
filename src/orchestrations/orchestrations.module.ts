import { Module } from '@nestjs/common';
import { OrchestrationsService } from './orchestrations.service';
import { OrchestrationsController } from './orchestrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orchestration } from './entities/orchestration.entity';

@Module({
  controllers: [OrchestrationsController],
  providers: [OrchestrationsService],
  imports: [
    /**
     * Configurate Entities
     */
    TypeOrmModule.forFeature([Orchestration]),
  ],
})
export class OrchestrationsModule {}
