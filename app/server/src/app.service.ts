import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from './prisma/prisma.service';
import { Product, skuBase, skuProp } from './Types';
import { ConfigService } from '@nestjs/config';
import { reviews } from './Types/types';
import { skuValues } from '@prisma/client';
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

@Injectable()
export class AppService {
  private index = 0;
  private skuProp: skuProp[];
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

  async createProduct(productDetails: any, categoryId: number) {
    try {
      await this.prisma.product.create({
        data: {
          id: productDetails.itemId,
          title: productDetails.title,
          price: String(productDetails.sku.def.price),
          image: productDetails.images,
          ImageDesc: productDetails.description.images,
          video: productDetails.video?.url,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async createProductSkuBase(productDetails: any) {
    await Promise.all(
      productDetails.sku.base.map(async (item: skuBase) => {
        try {
          await this.prisma.skuBase.create({
            data: {
              propMap: item.propMap,
              price: item.price,
              promotionPrice: item.promotionPrice,
              quantity: item.quantity,
              ext: item.ext,
              productId: productDetails.itemId,
            },
          });
        } catch (error) {
          console.error(`Error creating skuBase: ${error.message}`);
          throw new InternalServerErrorException('Internal Server Error');
        }
      }),
    );
  }

  async createProductSkuProp(productDetails: any) {
    try {
      this.skuProp = await Promise.all(
        productDetails.sku.props.map(async (item: skuProp) => {
          return await this.prisma.skuProp.create({
            data: {
              pid: item.pid,
              name: item.name,
              productId: productDetails.itemId,
            },
          });
        }),
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async createProductSkuValues(productDetails: any) {
    let idx = -1;
    try {
      await Promise.all(
        productDetails.sku.props.map(async (item: skuProp) => {
          await Promise.all(
            item.values?.map(async (value) => {
              idx++;
              console.log(idx, this.skuProp[idx]);
              return this.prisma.skuValues.create({
                data: {
                  vid: value.vid,
                  name: value.name,
                  propTips: value.propTips,
                  image: value.image,
                  skuPropPid: this.skuProp[idx].id,
                },
              });
            }),
          );
        }),
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async createProductReviews(productReviews: any, productId: number) {
    try {
      await Promise.all(
        productReviews.map(async (item) => {
          await this.prisma.reviews.create({
            data: {
              Date: item.Date,
              content: item.content,
              stars: item.stars,
              images: item.images,
              helpful: item.helpful,
              productId: String(productId),
            },
          });
        }),
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getAndStoreProduct(productId: number, categoryId: number) {
    const productDetails = await this.getProductDetails(productId);
    if (productDetails) {
      await this.createProduct(productDetails, categoryId);
      await this.createProductSkuBase(productDetails);
      await this.createProductSkuProp(productDetails);
      await this.createProductSkuValues(productDetails);
    }
  }

  async getAndStoreReviews(productId: number) {
    const productReviews = await this.getProductReviews(productId);
    if (productReviews) {
      await this.createProductReviews(productReviews, productId);
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

  async requestProductsReviews(response) {
    console.log('requestProductsReviews is called');
    if (this.index < response.length) {
      console.log(this.index, response.length);
      const product = response[this.index];
      await this.getAndStoreReviews(product.item.itemId);
      this.index++;
    } else {
      // All requests are completed
      this.index = 0;
      this.firstIntervalRunning = false;
    }
  }

  requestProductsDetails = async (
    response: any[],
    reviewTimer: NodeJS.Timeout,
    categoryId: number,
  ) => {
    console.log('requestProductsDetails is called');
    if (this.index < response.length) {
      console.log(this.index, response.length);
      const product = response[this.index];
      await this.getAndStoreProduct(product.item.itemId, categoryId);
      this.index++;
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
    const requestInterval = 2000;
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
          this.requestProductsReviews(response);
        } else {
          clearInterval(requestTimer);
          reviewTimer = setInterval(
            () => this.requestProductsDetails(response, reviewTimer, categoryDB.id),
            requestInterval,
          );
        }
      }, requestInterval);
    } catch (error) {
      console.log('null2');
    }
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
}
