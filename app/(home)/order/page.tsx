import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import axios from "axios";
import { columns } from "@/components/order/column"; // Adjust path
import { OrderList } from "@/components/order/order-list"; // <<< Import Client Component mới
import { Order } from "@/lib/types";

const sampleCustomerInfo = {
  name: "GiangLe",
  email: "Leanhgiang89@gmail.com",
  company: "Tòa nhà Hà Nội group",
  address: "442 Đội Cấn, Ba Đình Hà Nội",
  phone: "(04) 3786 8904",
  addressDetailUrl: "/addresses",
};

async function getOrders(): Promise<Order[]> {
  try {
    const res = await axios.get(
      `${process.env.SERVER_API_URL}/orders?_embed=order_items`
    );
    const ordersData = res.data.map(
      (order: any, index: number) =>
        ({
          id: order.id as string,
          code: order.id.slice(0, 8).toUpperCase(),
          date: order.created_at,
          quantity: order.order_items.length,
          total: order.total_price,
          status: order.status,
          paymentMethod: order.payment_method as string,
          stt: (index + 1).toString(),
          detailUrl: `/order/${order.id}`,
        } as Order)
    );
    return ordersData;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export default async function OrderPage() {
  const initialOrders = await getOrders();
  const customerInfo = sampleCustomerInfo;

  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />

      <div>
        <h1 className="text-3xl">ĐƠN HÀNG</h1>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-1 mb-4"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 ">
        <div className="w-full lg:flex-1">
          <OrderList initialOrders={initialOrders} columns={columns} />
        </div>

        <div className="w-full lg:w-1/4">
          <div className="border border-gray-300 rounded p-4 space-y-3 bg-gray-50 h-fit">
            <h2 className="text-lg  border-b pb-2 mb-3 text-gray-800">
              THÔNG TIN KHÁCH HÀNG
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium">{customerInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                <span>{customerInfo.email}</span>
              </div>
              {customerInfo.company && (
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium">{customerInfo.company}</span>
                    <span>{customerInfo.address}</span>
                  </div>
                </div>
              )}
              {!customerInfo.company && customerInfo.address && (
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
                  <span>{customerInfo.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-500" />
                <span>{customerInfo.phone}</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href={customerInfo.addressDetailUrl}
                className="inline-block w-full text-center px-4 py-2 border border-gray-400 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 hover:border-gray-500 transition-colors"
              >
                Chi tiết địa chỉ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
