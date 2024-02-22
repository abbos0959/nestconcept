import { Connection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlaworEntity } from './entity/flawor.entity/flawor.entity';
import { Coffee } from './entity/coffee.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(FlaworEntity), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    describe('id exist', () => {
      it('coffee object', async () => {
        const coffeeId = '1';
        const expectCoffees = {};
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectCoffees);
      });
    });
  });
});
