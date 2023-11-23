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

export class CardListDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsString()
  @IsNotEmpty()
  image: string;
}
