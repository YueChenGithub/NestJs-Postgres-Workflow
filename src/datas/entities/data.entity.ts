import { Block } from 'src/blocks/entities/block.entity';
import { Orchestration } from 'src/orchestrations/entities/orchestration.entity';
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

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Orchestration, (orchestration) => orchestration.data, {
    nullable: true,
  })
  @JoinColumn()
  orchestration: Orchestration;

  @OneToOne(() => Block, (block) => block.data, { nullable: true })
  @JoinColumn()
  block: Block;
}
