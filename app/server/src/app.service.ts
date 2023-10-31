import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from './prisma/prisma.service';
import { Product, skuBase, skuProp } from './Types';
import { ConfigService } from '@nestjs/config';
import { reviews } from './Types/types';
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

@Injectable()
export class AppService {
  private reviews: reviews[];
  private firstIntervalRunning = true;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async syncDataFromApi() {
    const data = [
      {
        categoryName: 'kids',
        search: 'clothes for kids',
        categoryDesc:
          "Explore our Kids category for the cutest clothes, exciting toys, and essential baby gear. Find everything you need to make your child's world a little brighter.",
      },
      {
        categoryName: 'accessories',
        search: 'accessories',
        categoryDesc:
          "Explore our Kids category for the cutest clothes, exciting toys, and essential baby gear. Find everything you need to make your child's world a little brighter.",
      },
      {
        categoryName: 'electornic',
        search: 'iphones',
        categoryDesc:
          "Explore our Kids category for the cutest clothes, exciting toys, and essential baby gear. Find everything you need to make your child's world a little brighter.",
      },
      {
        categoryName: 'clothes',
        search: 'men authumn clothes',
        categoryDesc:
          "Explore our Kids category for the cutest clothes, exciting toys, and essential baby gear. Find everything you need to make your child's world a little brighter.",
      },
    ];

    // for (const item of data) {
    await this.getCategoryProducts(data[0]);
    // }
  }
  async getProductDetails(productId: number) {
    const options = {
      method: 'GET',
      url: 'https://aliexpress-datahub.p.rapidapi.com/item_detail_5',
      params: {
        itemId: productId,
      },
      headers: this.getApiHeaders(),
    };

    try {
      console.log('getting product details....');
      const response = await axios.request(options);
      if (response.data) console.log('fetching successfully');
      return response.data?.result?.item;
    } catch (error) {
      console.log(error);
    }
  }

  async getAndStoreProduct(productId: number, categoryId: number) {
    const productDetails = await this.getProductDetails(productId);
    if (productDetails) {
      await this.prisma.product.create({
        data: {
          id: Number(productDetails.itemId),
          title: productDetails.title,
          price: String(productDetails.sku.def.price),
          image: productDetails.images,
          ImageDesc: productDetails.description.images,
          base: productDetails.sku.base,
          props: productDetails.sku.props,
          reviews: {
            connect: this.reviews.map((review) => ({
              id: review.id,
            })),
          },
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
    }
  }

  async getAndStoreReviews(productId: number) {
    const productReviews = await this.getProductReviews(productId);
    if (productReviews) {
      this.reviews = await Promise.all(
        productReviews.map(async (item) => {
          const res = await this.prisma.reviews.create({
            data: {
              Date: item.Date,
              content: item.content,
              stars: item.stars,
              images: item.images,
              helpful: item.helpful,
              ProductId: productId,
            },
          });
          console.log(res);
          return res;
        }),
      );
      console.log(this.reviews)
    }
  }

  async getProductReviews(productId: number) {
    const options = {
      method: 'GET',
      url: 'https://aliexpress-datahub.p.rapidapi.com/item_review',
      params: {
        itemId: productId,
        page: '1',
      },
      headers: this.getApiHeaders(),
    };

    try {
      console.log('getting product reviews....');
      const response = await axios.request(options);
      if (response.data.result) console.log('fetching successfully');
      return response.data.result.resultList;
    } catch (error) {
      console.log('null');
    }
  }

  private async requestProductsReviews(response, index: number) {
    console.log('requestProductsReviews is called');
    if (index < response.length) {
      const product = response[index];
      await this.getAndStoreReviews(product.item.itemId);
      this.firstIntervalRunning = false;
      index++;
    } else {
      // All requests are completed
      this.firstIntervalRunning = false;
    }
  }

  requestProductsDetails = async (response, reviewTimer, index, categoryId: number) => {
    console.log('requestProductsDetails is called');
    if (index < response.length) {
      const product = response[index];
      await this.getAndStoreProduct(product.item.itemId, categoryId);
      clearInterval(reviewTimer);
      index++;
    } else {
      // All requests are completed
      console.log('all requests are completed');
      clearInterval(reviewTimer);
    }
  };
  async getCategoryProducts(category: {
    categoryName: string;
    search: string;
    categoryDesc: string;
  }) {
    let index = 0;
    const requestInterval = 1000;
    let reviewTimer: NodeJS.Timeout;

    try {
      const response = await this.fetchCategoryData(category.search);
      const categoryDB = await this.prisma.category.create({
        data: {
          type: category.categoryName,
          description: category.categoryDesc,
        },
      });
      const requestTimer = setInterval(() => {
        if (this.firstIntervalRunning) {
          console.log('again1');
          this.requestProductsReviews(response, index);
        } else {
          clearInterval(requestTimer);
          index = 0;
          reviewTimer = setInterval(
            () =>
              this.requestProductsDetails(response, reviewTimer, index, categoryDB.id),
            requestInterval * 4,
          );
        }
      }, requestInterval * 4);
      // console.log('storing db....');
      // await this.storeDataInDatabase(category);
    } catch (error) {
      console.log('null2');
    }
  }

  private mapProductDetails(productDetails: {
    itemId: string;
    title: string;
    sku: { def: { price: string }; base: skuBase[]; props: skuProp[] };
    images: string[];
    description: { images: string[] };
  }) {
    return {
      id: Number(productDetails.itemId),
      title: productDetails.title,
      price: String(productDetails.sku.def.price),
      image: productDetails.images,
      ImageDesc: productDetails.description.images,
      base: productDetails.sku.base,
      props: productDetails.sku.props,
      reviews: [],
    };
  }

  private async fetchCategoryData(searchQuery: string) {
    const options = {
      method: 'GET',
      url: 'https://aliexpress-datahub.p.rapidapi.com/item_search',
      params: {
        q: searchQuery,
        page: '1',
      },
      headers: this.getApiHeaders(),
    };
    try {
      console.log('fetchCategoryData');
      const response = await axios.request(options);
      if (response.data) console.log('fetching successfully');
      return response.data.result.resultList;
    } catch (error) {
      console.log('NULL');
    }
  }

  private getApiHeaders() {
    return {
      'X-RapidAPI-Key': this.config.get('APY_KEY'),
      'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
    };
  }

  // private async storeDataInDatabase(category: {
  //   categoryName: string;
  //   search?: string;
  //   categoryDesc: string;
  // }) {
  //   await this.prisma.category.create({
  //     data: {
  //       type: category.categoryName,
  //       description: category.categoryDesc,
  //       products: {
  //         connect: {
  //           id: this.products[0].id,
  //         },
  //       },
  //     },
  //   });
  // }
}
