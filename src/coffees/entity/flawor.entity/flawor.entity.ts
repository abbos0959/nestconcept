import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from '../coffee.entity';

@Entity()
export class FlaworEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @ManyToMany(() => Coffee, (coffees) => coffees.flawors)
  coffess: Coffee[];
}
