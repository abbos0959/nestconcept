import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'name kiritish uchun' })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'brand kiritish uchun' })
  @IsString()
  readonly brand: string;
  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flawors: string[];
}
