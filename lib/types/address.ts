export interface Address {
  id: string;
  userId: string;
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
}

export interface AddressStatusOpenFormEdit {
  addressDetail: Address;
  openFormEdit: boolean;
}

export type AddressFormInput = Omit<
  Address,
  "id" | "userId" | "created_at" | "updated_at"
>;
