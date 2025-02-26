import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrchestrationType } from '../enums/orchestration-type.enum';
import { Data } from '../../datas/entities/data.entity';
import { Block } from '../../blocks/entities/block.entity';

@Entity()
export class Orchestration {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column({ unique: true }) // unique column need extra exception handling
  name: string;

  @Column({ nullable: true })
  description: string | null;

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

  @OneToOne(() => Data, {
    cascade: true,
    // nullable: false
  })
  @JoinColumn()
  input_data: Data | null;

  @OneToOne(() => Data, {
    cascade: true,
    // nullable: false
  })
  @JoinColumn()
  output_data: Data | null;

  @ManyToMany(() => Block, (block) => block.orchestrations) // bidirectional relation
  @JoinTable() // suggest add JoinTable() to the owning side, the FK will be added here
  blocks: Block[] | null;
}
