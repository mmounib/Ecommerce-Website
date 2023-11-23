import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardList, CardListDto, FilterdData } from './dto/product.dto';

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

  async getProducts(proId: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: proId,
      },
    });
  }

  async getSubProducts(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        base: true,
        props: {
          include: {
            values: true,
          },
        },
      },
    });
    const products = [];
    for (const item of product.base) {
      const base = await this.prisma.skuBase.findUnique({
        where: {
          skuId: item.skuBaseId,
        },
      });
      let image: string = '';
      let title: string;
      for (const propMap of base.propMap.split(';')) {
        const [pid, vid] = propMap.split(':');
        const prop = await this.prisma.skuProp.findFirst({
          where: {
            pid: +pid,
            productId,
          },
          include: {
            values: true,
          },
        });
        const value = await this.prisma.skuValues.findFirst({
          where: {
            vid: +vid,
            skuPropPid: prop.id,
          },
        });
        if (value.image) image = value.image;
        title = !title
          ? `${prop.name}: ${value.name}`
          : title + ' - ' + `${prop.name}: ${value.name}`;
      }
      products.push({ title, image, price: base.price, quantity: base.quantity });
    }
    return products;
  }
  async getCardLists(data: CardListDto, userId: string) {
    const shoppingList = await this.prisma.shoppingList.create({
      data: {
        userId,
      },
    });
    await this.prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        productShopping: {
          create: {
            ShoppingListId: shoppingList.id,
            quantity: data.quantity,
            // Adding price and image of the selected color
          },
        },
      },
    });
    return data;
  }
}
