import { Test, TestingModule } from '@nestjs/testing';
import { OrchestrationsService } from './orchestrations.service';
import { Orchestration } from './entities/orchestration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateOrchestrationDto } from './dto/create-orchestration.dto';
import { OrchestrationType } from './enums/orchestration-type.enum';

describe('OrchestrationsService', () => {
  let service: OrchestrationsService;

  // Mock repository
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrchestrationsService,
        {
          provide: getRepositoryToken(Orchestration),
          useValue: mockRepository, // Injecting mock repository
        },
      ],
    }).compile();

    service = module.get<OrchestrationsService>(OrchestrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test
  describe('testing create function', () => {
    it('should create and return orchestration', async () => {
      // define function input and mockRepository
      const dto: CreateOrchestrationDto = {
        name: 'Test Orchestration',
        description: 'Test Description',
        type: OrchestrationType.TYPEA,
        blocks_order: [1, 2, 3],
      };
      const mockRepositoryOutput: Orchestration = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
        input_data: null,
        output_data: null,
        blocks: null,
      } as Orchestration;

      // Mock repository behavior
      mockRepository.create.mockReturnValue(mockRepositoryOutput);
      mockRepository.save.mockResolvedValue(mockRepositoryOutput);

      // Call the service method
      const result = await service.create(dto);

      // Assertions
      expect(result).toEqual(mockRepositoryOutput);
    });
  });
});
