import { Address } from "@/lib/types/address";

export interface User {
  id: string;
  full_name: string;
  email: string;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithAddress {
  id: string;
  full_name: string;
  email: string;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
  addresses: Address[];
}
