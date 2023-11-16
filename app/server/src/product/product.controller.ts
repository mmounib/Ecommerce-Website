import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterdData } from './dto';

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
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProduct(id);
  }
  @Get('skuBase/:id')
  async getSkuBase(@Param('id') id: string) {
    return await this.productService.getSkuBase(id);
  }
  @Get('skuProp/:id')
  async getSkuProp(@Param('id') id: number) {
    return await this.productService.getSkuProp(id as number);
  }
}
