import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrchestrationType } from '../enums/orchestration-type.enum';

export class CreateOrchestrationDto {
  @IsNotEmpty()
  @IsString()
  name: string; // no contraints for unique

  @IsOptional()
  @IsString()
  description?: string; // do not forget ? sign

  @IsArray()
  @ArrayNotEmpty()
  blocks_order: number[];

  @IsEnum(OrchestrationType)
  @IsOptional()
  type?: OrchestrationType;
}
