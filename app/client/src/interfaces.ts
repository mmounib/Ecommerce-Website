export interface priceRange {
  priceStart: string;
  priceEnd: string;
}

export interface CustomError {
  message: string;
  response?: {
    status: number;
    data: any;
  };
  config?: any;
}

export interface FilterdData {
  stars: number;
  priceStart: string;
  priceEnd: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  address?: string;
  cards?: any;
  favourite?: any;
}

export interface ProductObject {
  id: string;
  title: string;
  price: string;
  image: string[];
  ImageDesc: string[];
  video?: string;
  base: any[];
  props: any[];
  reviews: any[];
}

export interface Customer {
  name: string;
  date: string;
  text: string;
}
export interface ProductContainer {
  id: string;
  categoryId: string;
  ImageDesc: string[];
  price: number;
  title: string;
  video?: string;
  image: string[];
}

export interface cardList {
  id?: string;
  title: string;
  image: string;
  price: number;
  quantity?: number;
}
