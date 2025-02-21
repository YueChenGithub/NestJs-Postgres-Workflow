import { Injectable } from '@nestjs/common';
import { CreateOrchestrationDto } from './dto/create-orchestration.dto';
import { UpdateOrchestrationDto } from './dto/update-orchestration.dto';
import { Orchestration } from './entities/orchestration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrchestrationsService {
  constructor(
    /**
     * Injecting orchestration repository
     */
    @InjectRepository(Orchestration)
    private orchestrationRepository: Repository<Orchestration>,
  ) {}

  async create(
    createOrchestrationDto: CreateOrchestrationDto,
  ): Promise<Orchestration> {
    const orchestration = this.orchestrationRepository.create(
      createOrchestrationDto,
    );
    return await this.orchestrationRepository.save(orchestration);
  }

  findAll() {
    return `This action returns all orchestrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orchestration`;
  }

  update(id: number, updateOrchestrationDto: UpdateOrchestrationDto) {
    return `This action updates a #${id} orchestration`;
  }

  remove(id: number) {
    return `This action removes a #${id} orchestration`;
  }
}
