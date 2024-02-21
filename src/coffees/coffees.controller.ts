import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeservice: CoffeesService) {}
  @Get()
  findall(@Query() paginationquery) {
    const { limit, offset } = paginationquery;

    return this.coffeservice.findall();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeservice.findOne(id);
  }

  @Post()
  create(@Body() createcoofeedto: CreateCoffeeDto) {
    return this.coffeservice.create(createcoofeedto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatCooffeeDto: UpdateCoffeeDto) {
    return this.coffeservice.update(id, updatCooffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeservice.delete(id);
  }
}
