import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      address: user.address,
    };
  }

  async getWishList(userId: string) {
    const favouritesList = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favourites: {
          include: {
            product: true,
          },
        },
      },
    });
    const res = await this.prisma.product.findMany({
      where: {
        OR:
          favouritesList.favourites?.product?.map((item) => {
            return { id: item.productId };
          }) ?? [],
      },
      select: {
        id: true,
        image: true,
        title: true,
        price: true,
      },
    });
    return res;
  }

  async addToFavList(userId: string, productId: string) {
    try {
      await this.prisma.favouritesList.create({
        data: {
          userId,
        },
      });
    } catch (err) {}
    const favProduct = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favourites: true,
      },
    });
    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        productFavourite: {
          create: {
            favouriteId: favProduct.favourites.id,
          },
        },
      },
    });
  }
}
