import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardListDto, FilterdData } from './dto/product.dto';

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

  async addToCardList(data: CardListDto, userId: string) {
    try {
      await this.prisma.shoppingList.create({
        data: {
          userId,
        },
      });
    } catch (err) {}
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        shopping: true,
      },
    });
    await this.prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        productShopping: {
          create: {
            ShoppingListId: user.shopping.id,
            quantity: data.quantity,
            title: data.title,
            price: data.price,
            image: data.image,
          },
        },
      },
    });
  }
  async getCardList(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        shopping: {
          include: {
            ShoppingProducts: {
              select: {
                id: true,
                title: true,
                image: true,
                price: true,
                quantity: true,
              },
            },
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('user not found');
    return user.shopping.ShoppingProducts;
  }

  async deleteShoppingProduct(productId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        shopping: {
          select: {
            ShoppingProducts: {
              where: {
                id: productId,
              },
            },
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('user not found')
    await this.prisma.shoppingProducts.delete({
      where: {
        id: user.shopping.ShoppingProducts[0].id,
      },
    });
  }
}
