import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { Data } from './entities/data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DatasController],
  providers: [DatasService],
  imports: [TypeOrmModule.forFeature([Data])],
})
export class DatasModule {}
