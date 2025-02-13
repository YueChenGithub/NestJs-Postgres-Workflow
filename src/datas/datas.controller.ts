import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatasService } from './datas.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('datas')
export class DatasController {
  constructor(private readonly datasService: DatasService) {}

  @Post()
  create(@Body() createDataDto: CreateDataDto) {
    return this.datasService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.datasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
    return this.datasService.update(+id, updateDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datasService.remove(+id);
  }
}
