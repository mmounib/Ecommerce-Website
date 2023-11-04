import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from './prisma/prisma.service';
import { skuBase, skuProp } from './Types';
import { ConfigService } from '@nestjs/config';

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

    for (const item of data) {
      console.log(`Starting processing category: ${item.categoryName}`);
      await this.getCategoryProducts(item);
    }
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
      const response = await axios.request(options);
      return response.data?.result?.item;
    } catch (error) {
      options.headers['X-RapidAPI-Key'] = this.config.get('API_KEY2');
      const response = await this.reRequest(options);
      return response.data?.result?.item;
    }
  }

  async createProduct(productDetails: any, categoryId: number) {
    for (let i = 0; productDetails.images && i < productDetails.images.length; i++)
      productDetails.images[i] = productDetails.images[i].slice(2);
    for (let i = 0; productDetails.description.images && i < productDetails.description.images.length; i++)
      productDetails.description.images[i] = productDetails.description.images[i].slice(2);
    try {
      await this.prisma.product.create({
        data: {
          id: productDetails.itemId,
          title: productDetails.title,
          price: String(productDetails.sku.def.price),
          image: productDetails.images,
          ImageDesc: productDetails.description.images,
          video: productDetails.video?.url.slice(2),
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createProductSkuBase(productDetails: any) {
    if (productDetails.sku?.base) {
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
                products: {
                  create: {
                    productId: productDetails.itemId,
                  },
                },
              },
            });
          } catch (error) {
            console.log(error);
          }
        }),
      );
    }
  }

  async createProductSkuProp(productDetails: any) {
    try {
      if (productDetails.sku?.props) {
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
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createProductSkuValues(productDetails: any) {
    let idx = -1;
    try {
      if (productDetails.sku?.props) {
        await Promise.all(
          productDetails.sku?.props?.map(async (item: skuProp) => {
            idx++;
            if (item.values) {
              await Promise.all(
                item.values?.map(async (value) => {
                  try {
                    return await this.prisma.skuValues.create({
                      data: {
                        vid: value.vid,
                        name: value.name,
                        propTips: value.propTips,
                        image: value.image.slice(2),
                        skuPropPid: this.skuProp[idx].id,
                      },
                    });
                  } catch (error) {}
                }),
              );
            }
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createProductReviews(productReviews: any, productId: number) {
    try {
      await Promise.all(
        productReviews.map(async (item) => {
          for (let i = 0; item.images && i < item.images.length; i++) item.images[i] = item.images[i].slice(2);
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
      const response = await axios.request(options);
      return response.data.result.resultList;
    } catch (error) {
      options.headers['X-RapidAPI-Key'] = this.config.get('API_KEY2');
      const response = await this.reRequest(options);
      return response.data.result.resultList;
    }
  }

  async requestProductsReviews(response) {
    console.log('requestProductsReviews is called');
    if (this.index < response.length) {
      const product = response[this.index];
      this.index++;
      await this.getAndStoreReviews(product.item.itemId);
    } else {
      // All requests are completed
      this.index = 0;
      this.firstIntervalRunning = false;
    }
  }

  async requestProductsDetails(
    response: any[],
    reviewTimer: NodeJS.Timeout,
    categoryId: number,
    resolve,
  ) {
    console.log('requestProductsDetails is called');
    if (this.index < response.length) {
      const product = response[this.index];
      this.index++;
      await this.getAndStoreProduct(product.item.itemId, categoryId);
    } else {
      // All requests are completed
      this.index = 0;
      this.firstIntervalRunning = true;
      console.log('all requests are completed');
      clearInterval(reviewTimer);
      resolve();
    }
  }

  async getCategoryProducts(category: {
    categoryName: string;
    search: string;
    categoryDesc: string;
  }) {
    const requestInterval = 1700;
    let reviewTimer: NodeJS.Timeout;

    const categoryFind = await this.prisma.category.findFirst({
      where: {
        type: category.categoryName
      }
    })
    if (categoryFind) return;

    try {
      const response = await this.fetchCategoryData(category.search);
      const categoryDB = await this.prisma.category.create({
        data: {
          type: category.categoryName,
          description: category.categoryDesc,
        },
      });
      await this.setIntervalWithPromise(requestInterval, reviewTimer, response, categoryDB.id);
    } catch (error) {
      console.log('null2');
    }
  }

  setIntervalWithPromise(
    requestInterval: number,
    reviewTimer: NodeJS.Timeout,
    response: any,
    categoryId: number,
  ) {
    return new Promise((resolve) => {
      const requestTimer = setInterval(() => {
        if (this.firstIntervalRunning) {
          this.requestProductsReviews(response);
        } else {
          clearInterval(requestTimer);
          reviewTimer = setInterval(
            () => this.requestProductsDetails(response, reviewTimer, categoryId, resolve),
            requestInterval,
          );
        }
      }, requestInterval);
    });
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
      options.headers['X-RapidAPI-Key'] = this.config.get('API_KEY2');
      const response = await this.reRequest(options);
      return response.data.result.resultList;
    }
  }

  async reRequest(options: {
    method: string;
    url: string;
    params: any;
    headers: {
      'X-RapidAPI-Key': string;
      'X-RapidAPI-Host': string;
    };
  }) {
    try {
      return await axios.request(options);
    } catch (error) {
      console.error(error);
    }
  }

  getApiHeaders() {
    return {
      'X-RapidAPI-Key': this.config.get('API_KEY1'),
      'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
    };
  }
}
