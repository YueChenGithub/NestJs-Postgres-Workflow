import { Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Injectable()
export class DatasService {
  create(createDataDto: CreateDataDto) {
    return 'This action adds a new data';
  }

  findAll() {
    return `This action returns all datas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} data`;
  }

  update(id: number, updateDataDto: UpdateDataDto) {
    return `This action updates a #${id} data`;
  }

  remove(id: number) {
    return `This action removes a #${id} data`;
  }
}
