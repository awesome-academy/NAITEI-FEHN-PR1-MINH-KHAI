import { Product } from "@/lib/types/product";

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  checked: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

export interface CartDataType {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  checked: boolean;
  created_at: string;
  updated_at: string;
  product: Product;
}
