import { Injectable } from '@nestjs/common';
import { CreateOrchestrationDto } from './dto/create-orchestration.dto';
import { UpdateOrchestrationDto } from './dto/update-orchestration.dto';

@Injectable()
export class OrchestrationsService {
  create(createOrchestrationDto: CreateOrchestrationDto) {
    return 'This action adds a new orchestration';
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
