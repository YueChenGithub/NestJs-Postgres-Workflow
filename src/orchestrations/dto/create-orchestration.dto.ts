import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrchestrationType } from '../enums/orchestration-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrchestrationDto {
  @ApiProperty({
    example: 'Sample Orchestration',
  })
  @IsNotEmpty()
  @IsString()
  name: string; // no contraints for unique

  @ApiProperty({
    example: 'This is a sample orchestration.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string; // do not forget ? sign

  @ApiProperty({
    example: [1, 2, 3, 4],
  })
  @IsArray()
  @ArrayNotEmpty()
  blocks_order: number[];

  @ApiProperty({
    enum: OrchestrationType,
    required: false,
    example: OrchestrationType.TYPEA,
  })
  @IsEnum(OrchestrationType)
  @IsOptional()
  type?: OrchestrationType;
}
