import { AnyARecord } from 'dns';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

export type Tokens = {
  name: string;
  value: string;
  date: number;
};

export type skuBase = {
  skuId: string;
  propMap: string;
  price: any;
  promotionPrice: number;
  quantity: number;
  productId?: number;
  ext: string;
};

export type reviews = {
  id: number;
  Date: string;
  content: string;
  stars: number;
  images: string[];
  helpful: number;
  ProductId?: number;
};

export type skuReviews = {
  review: reviews;
};

export type skuValues = {
  vid: number;
  name: string;
  image?: string | null;
  propTips: string;
};

export type skuProp = {
  pid: number;
  name: string;
  values: skuValues[];
};

export type Product = {
  id: number;
  categoryId?: number;
  title: string;
  price: any;
  image: string[];
  ImageDesc: string[];
  base: skuBase[];
  props: skuProp[];
  reviews: reviews[];
};
