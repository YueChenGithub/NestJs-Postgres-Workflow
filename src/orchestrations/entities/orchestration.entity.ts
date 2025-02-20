import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrchestrationType } from '../enums/orchestration-type.enum';
import { Data } from 'src/datas/entities/data.entity';

@Entity()
export class Orchestration {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column({ unique: true }) // unique column need extra exception handling
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum', // necessary to add enum type
    enum: OrchestrationType,
    default: OrchestrationType.TYPEA, // optional
  })
  type: OrchestrationType;

  @Column({ type: 'integer', array: true })
  blocks_order: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Data, { cascade: true })
  @JoinColumn()
  input_data: Data;

  @OneToOne(() => Data, { cascade: true })
  @JoinColumn()
  output_data: Data;
}
