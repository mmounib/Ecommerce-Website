import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FilterdData {
  @IsNumber()
  @IsNotEmpty()
  stars: number;

  @IsString()
  @IsNotEmpty()
  priceStart: string;

  @IsString()
  @IsNotEmpty()
  priceEnd: string;
}
