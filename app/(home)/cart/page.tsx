import React from "react";
import Image from "next/image";
import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import CartMain from "@/components/cart/cart-main";
import { CartDataType, CartItemProps } from "@/lib/types/cart";
import axios from "axios";
import { getCurrentUserServer } from "@/lib/server-utils";

export async function getCartItems(): Promise<CartItemProps[]> {
  try {
    const currentUser = await getCurrentUserServer();
    if (currentUser) {
      const res = await axios.get(
        `${process.env.SERVER_API_URL}/carts?userId=${currentUser.id}&_expand=product`
      );
      const cartItemsData: CartItemProps[] = res.data.map(
        (cartData: CartDataType) => ({
          id: cartData.id,
          name: cartData.product.name,
          price:
            cartData.product.price *
            (1 - cartData.product.discount / 100) *
            1000,
          quantity: cartData.quantity,
          image: cartData.product.images[0]?.url || "",
          selected: cartData.checked,
        })
      );
      return cartItemsData;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function CartPage() {
  const cartItemsData = await getCartItems();
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div className="flex flex-col w-full justify-start">
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          GIỎ HÀNG
        </h2>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-2 mb-4"
        />
      </div>
      <CartMain cartItemsData={cartItemsData} />
    </main>
  );
}
