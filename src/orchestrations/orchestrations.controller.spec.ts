import { Test, TestingModule } from '@nestjs/testing';
import { OrchestrationsController } from './orchestrations.controller';
import { OrchestrationsService } from './orchestrations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orchestration } from './entities/orchestration.entity';
import { Repository } from 'typeorm';

describe('OrchestrationsController', () => {
  let controller: OrchestrationsController;
  let service: OrchestrationsService;

  // Mock repository with jest
  const mockRepository: Partial<
    Record<keyof Repository<Orchestration>, jest.Mock>
  > = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue({ id: 1 }),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrchestrationsController],
      providers: [
        OrchestrationsService,
        {
          provide: getRepositoryToken(Orchestration), // Mock the repository
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<OrchestrationsController>(OrchestrationsController);
    service = module.get<OrchestrationsService>(OrchestrationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
