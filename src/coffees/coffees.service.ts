import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { FlaworEntity } from './entity/flawor.entity/flawor.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PaginationQueryDto } from './common/pagination-query-dto';
// import { EventEmitter } from 'typeorm/platform/PlatformTools';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(FlaworEntity)
    private readonly flaworRepository: Repository<FlaworEntity>,

    private readonly connection: Connection,

    @Inject('COFFEE_BRANDS') coffeeBrands: string[],
  ) {}

  async findall(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    console.log(offset, 'bu offseet', limit);

    return await this.coffeeRepository.find({
      relations: ['flawors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const cooffee = await this.coffeeRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['flawors'],
    });

    if (!cooffee) {
      throw new NotFoundException(`cooffe topilmadi `);
    }
    return cooffee;
  }
  async create(createcoffeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createcoffeDto.flawors.map((name: any) => this.preloadFlwoerName(name)),
    );
    console.log(flavors, 'buflaworsssss', createcoffeDto);

    const coffee = this.coffeeRepository.create({
      ...createcoffeDto,
      flawors: flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async delete(id: string) {
    const existIndexCoofe = await this.coffeeRepository.findOneBy({
      id: parseInt(id),
    });

    if (!existIndexCoofe) {
      throw new NotFoundException('bunday idli coffee mavjud emas');
    }
    return this.coffeeRepository.remove(existIndexCoofe);
  }

  async update(id: string, updateCooffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCooffeeDto.flawors &&
      (await Promise.all(
        updateCooffeeDto.flawors.map((name) => this.preloadFlwoerName(name)),
      ));
    const existcoofe = await this.coffeeRepository.preload({
      id: +id,
      ...updateCooffeeDto,
      flawors: flavors,
    });

    if (!existcoofe) {
      throw new NotFoundException(`bunday idli coffe mavjud emas`);
    }

    return this.coffeeRepository.save(existcoofe);
  }

  // async recommendCoffee(coffee: Coffee) {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction;
  //   try {
  //     coffee.recombination++;
  //     const recommendEvent = Event();
  //     recommendEvent.name = 'recommend-coffee';
  //     recommendEvent.type = 'coffee';
  //     recommendEvent.payload = { coffeeId: coffee.id };

  //     await queryRunner.manager.save(coffee);
  //     await queryRunner.manager.save(recommendEvent);
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  private async preloadFlwoerName(name: string): Promise<FlaworEntity> {
    const existFlower = await this.flaworRepository.findOne({
      where: { name },
    });

    if (existFlower) {
      return existFlower;
    }
    return this.flaworRepository.create({ name });
  }
}
