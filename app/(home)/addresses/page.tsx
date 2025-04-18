import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import React from "react";
import Image from "next/image";
import AddressesMain from "@/components/addresses/addresses-main";
import { Address } from "@/lib/types/address";
import axios from "axios";
import { getCurrentUserServer } from "@/lib/server-utils";

export async function getAddressList(): Promise<Address[]> {
  try {
    const currentUser = await getCurrentUserServer();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/addresses?userId=${currentUser.id}`
    );
    const userAddresses: Address[] = res.data.map((address: Address) => ({
      id: address.id,
      userId: address.userId,
      first_name: address.first_name,
      last_name: address.last_name,
      company: address.company,
      address: address.address,
      city: address.city,
      country: address.country,
      zipcode: address.zipcode,
      phone: address.phone,
      default: address.default,
      created_at: address.created_at,
      updated_at: address.updated_at,
    }));
    return userAddresses;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function AddressPage() {
  const userAddresses = await getAddressList();
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div className="flex flex-col w-full justify-start">
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          ĐỊA CHỈ
        </h2>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-2 mb-4"
        />
        <AddressesMain addresses={userAddresses} />
      </div>
    </main>
  );
}
