import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrchestrationsService } from './orchestrations.service';
import { CreateOrchestrationDto } from './dto/create-orchestration.dto';
import { UpdateOrchestrationDto } from './dto/update-orchestration.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('orchestrations')
export class OrchestrationsController {
  constructor(private readonly orchestrationsService: OrchestrationsService) {}

  @ApiOperation({ summary: 'Create a new orchestration' })
  @ApiResponse({
    status: 201,
    description: 'The orchestration has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Body() createOrchestrationDto: CreateOrchestrationDto) {
    return this.orchestrationsService.create(createOrchestrationDto);
  }

  @Get()
  findAll() {
    return this.orchestrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orchestrationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrchestrationDto: UpdateOrchestrationDto,
  ) {
    return this.orchestrationsService.update(+id, updateOrchestrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orchestrationsService.remove(+id);
  }
}
