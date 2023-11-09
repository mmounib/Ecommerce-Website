import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterdData } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async categoryProducts(categoryName: string) {
    const products = await this.prisma.category.findUnique({
      where: {
        type: categoryName,
      },
      select: {
        products: true,
      },
    });
    console.log(products);
    return products;
  }

  async filtredProducts(categoryName: string, filteredData: FilterdData) {
    const category = await this.prisma.category.findUnique({
      where: {
        type: categoryName,
      },
      select: {
        id: true,
      },
    });
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
      include: {
        reviews: true,
      },
    });

    return products.filter((product) => {
      const parts = product.price.split(' - ');
      const firstValue = parseFloat(parts[0]);
      let secondValue: number;
      if (parts.length === 2) {
        secondValue = parseFloat(parts[1]);
        return (
          (Number(filteredData.priceStart) <= firstValue &&
            Number(filteredData.priceEnd) >= secondValue) ||
          Number(filteredData.priceEnd) >= firstValue
        );
      }
      return (
        firstValue >= Number(filteredData.priceStart) && firstValue <= Number(filteredData.priceEnd)
      );
    });
  }
}
