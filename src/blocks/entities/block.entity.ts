import { Data } from '../../datas/entities/data.entity';
import { Orchestration } from '../../orchestrations/entities/orchestration.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Data, {
    cascade: true,
    //nullable: false
  }) // uni-directional
  @JoinColumn()
  input_data: Data | null;

  @OneToOne(() => Data, {
    cascade: true,
    // nullable: false
  })
  @JoinColumn()
  output_data: Data | null;

  @ManyToMany(() => Orchestration, (orchestration) => orchestration.blocks) // bi-directional
  orchestrations: Orchestration[] | null;
}
