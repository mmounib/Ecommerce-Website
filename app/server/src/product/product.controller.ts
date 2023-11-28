import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CardListDto, FilterdData } from './dto';
import { AtGuard } from 'src/common/guards';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('categoryName/:categoryName')
  async categoryProducts(@Param('categoryName') categoryName: string) {
    return await this.productService.categoryProducts(categoryName);
  }

  @Patch('categoryName/:categoryName')
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
  @Post('addToCardList')
  async addToCardList(@Body() data: CardListDto, @Req() req: Request) {
    await this.productService.addToCardList(data, req.user['id']);
  }

  @UseGuards(AtGuard)
  @Get('cardList')
  async getCardList(@Req() req: Request) {
    return await this.productService.getCardList(req.user['id']);
  }

  @UseGuards(AtGuard)
  @Delete('cardList/:id')
  async deleteShoppingProduct(@Param('id') productId: string, @Req() req: Request) {
    await this.productService.deleteShoppingProduct(productId, req.user['id']);
  }

  @Get('newArrivals')
  async getNewArrivals() {
    return await this.productService.getNewArrivals();
  }

  @Get('bestSales')
  async getBestSales() {
    return await this.productService.getBestSales();
  }
}
