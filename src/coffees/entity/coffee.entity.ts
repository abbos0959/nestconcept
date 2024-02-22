import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlaworEntity } from './flawor.entity/flawor.entity';

@Entity('coffee')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;
  @Column({ default: 0 })
  recombination: number;

  @JoinTable()
  @ManyToMany(() => FlaworEntity, (flawor) => flawor.coffess, { cascade: true })
  flawors: FlaworEntity[];
}
