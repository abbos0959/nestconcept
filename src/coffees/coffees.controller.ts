import { ParseIntPipe } from './../common/pipes/parse-int/parse-int.pipe';
import { PaginationQueryDto } from './common/pagination-query-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Public } from 'src/common/decorators/public.decorator';

@UsePipes(new ValidationPipe())
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeservice: CoffeesService) {}

  @Public()
  @Get()
  async findall(@Query() paginationquery: PaginationQueryDto) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeservice.findall(paginationquery);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeservice.findOne(id);
  }
  @Public()
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
