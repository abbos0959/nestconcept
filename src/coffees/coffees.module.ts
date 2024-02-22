import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entity/coffee.entity';
import { FlaworEntity } from './entity/flawor.entity/flawor.entity';
import { EventEntity } from 'src/events/entities/event-entity/event-entity';

class MockCoffeeService {}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, FlaworEntity, EventEntity])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: 'COFFEE_BRANDS',
      useValue: ['buddy brew', 'nescafe'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
