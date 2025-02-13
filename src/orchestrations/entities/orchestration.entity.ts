import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orchestration {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;
}
