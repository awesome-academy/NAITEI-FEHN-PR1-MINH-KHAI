
export type Order = {
  id: number | string;
  stt: string;
  code: string;
  date: string;
  quantity: number;
  total: string;
  status: string;
  paymentMethod: string;
  detailUrl: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  color: string;
  productInfo: string;
  size: string;
  tags: string[];
  point: number;
  highlights: string;
  category: string;
  subCategory: string;
  createdAt: string;
  updatedAt: string;
  stock : number;

  discount?: number; // Optional discount field
};

export type Address = {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  address: string;
  city: string;
  country: string;
  zipcode: string;
  phone: string;
  default: boolean;
  created_at: string;
  updated_at: string;
};


export type BlogPost =  {
    id: string; // Unique ID or slug
    imageUrl: string;
    title: string;
    author: string;
    date: string;
    commentCount: number;
    description: string;
    href: string;
  }
