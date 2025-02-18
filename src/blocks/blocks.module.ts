import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { Block } from './entities/block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService],
  imports: [TypeOrmModule.forFeature([Block])],
})
export class BlocksModule {}
