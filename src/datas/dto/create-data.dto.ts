import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
