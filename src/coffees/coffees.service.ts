import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly cofferepository: Repository<Coffee>,
  ) {}

  findall() {
    return this.cofferepository.find();
  }

  async findOne(id: string) {
    const cooffee = await this.cofferepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!cooffee) {
      throw new NotFoundException(`cooffe topilmadi `);
    }
    return cooffee;
  }
  async create(createcoffeDto: any) {
    const coffee = this.cofferepository.create(createcoffeDto);
    return this.cofferepository.save(coffee);
  }

  async delete(id: string) {
    const existIndexCoofe = await this.cofferepository.findOneBy({
      id: parseInt(id),
    });

    if (!existIndexCoofe) {
      throw new NotFoundException('bunday idli coffee mavjud emas');
    }
    return this.cofferepository.remove(existIndexCoofe);
  }

  async update(id: string, updateCoofeDto: any) {
    const existcoofe = await this.cofferepository.preload({
      id: +id,
      ...UpdateCoffeeDto,
    });

    if (!existcoofe) {
      throw new NotFoundException(`bunday idli coffe mavjud emas`);
    }

    return this.cofferepository.save(existcoofe);
  }
}
