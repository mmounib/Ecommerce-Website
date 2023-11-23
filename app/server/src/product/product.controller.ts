import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CardList, CardListDto, FilterdData } from './dto';
import { AtGuard } from 'src/common/guards';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:categoryName')
  async categoryProducts(@Param('categoryName') categoryName: string) {
    return await this.productService.categoryProducts(categoryName);
  }

  @Patch('/:categoryName')
  async filtredProducts(
    @Param('categoryName') categoryName: string,
    @Body() filterData: FilterdData,
  ) {
    return await this.productService.filtredProducts(categoryName, filterData);
  }

  @Get('productId/:id')
  async getProducts(@Param('id') id: string) {
    return await this.productService.getProducts(id);
  }
  @Get('subProductId/:id')
  async getSubProducts(@Param('id') id: string) {
    return await this.productService.getSubProducts(id);
  }

  @UseGuards(AtGuard)
  @Post('cardList')
  async getCardLists(@Body() Body: CardListDto, @Req() req: Request) {
    console.log(Body);
    return await this.productService.getCardLists(Body, req.user['id']);
  }
}
