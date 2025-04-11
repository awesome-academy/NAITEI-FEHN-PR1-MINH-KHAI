import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import { Address, Order, OrderItem, Product } from "@/lib/types";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatVndThousands,
  statusStyle,
  translateOrderStatusTS,
} from "@/lib/utils";
import { Farro } from "next/font/google";
import { FaArrowRight } from "react-icons/fa";

async function getOrderDetails({ id }: { id: string }): Promise<{
  data: (Order & { address: Address; orderItems: OrderItem[] }) | null;
}> {
  try {
    const res = await axios.get(
      `${process.env.SERVER_API_URL}/orders/${id}?_expand=address&_embed=order_items`
    );

    if (!res.data || !res.data.id) {
      console.warn(`Order with ID ${id} not found.`);
      return { data: null };
    }

    const orderData = res.data;
    const embeddedItems = orderData.order_items || [];

    const productFetchPromises = embeddedItems.map(
      async (item: any): Promise<OrderItem> => {
        let fetchedProductData: Product | null = null;
        try {
          const productRes = await axios.get(
            `${process.env.SERVER_API_URL}/products/${item.productId}`
          );

          if (productRes.data) {
            const rawProduct = productRes.data;
            fetchedProductData = {
              id: rawProduct.id,
              name: rawProduct.name,
              image: rawProduct.images[0].url,
              price: rawProduct.price,
              description: rawProduct.description,
              color: rawProduct.color,
              productInfo: rawProduct.product_info,
              size: rawProduct.size,
              tags: rawProduct.tags,
              point: rawProduct.point,
              highlights: rawProduct.highlights,
              category: rawProduct.category,
              subCategory: rawProduct.sub_category,
              createdAt: rawProduct.created_at,
              updatedAt: rawProduct.updated_at,
              stock: rawProduct.stock,
            };
          }
        } catch (productError) {
          console.error(
            `Failed to fetch product ${item.productId} for order item ${item.id}:`,
            productError
          );
        }

        return {
          id: item.id,
          productId: item.productId,
          orderId: item.orderId,
          quantity: item.quantity,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          product: fetchedProductData!,
        };
      }
    );

    const orderItemsWithProducts: OrderItem[] = await Promise.all(
      productFetchPromises
    );
    const total_price = orderItemsWithProducts.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const finalData: Order & { address: Address; orderItems: OrderItem[] } = {
      id: orderData.id as string,
      code: orderData.id.slice(0, 8).toUpperCase(),
      date: orderData.created_at,
      quantity: embeddedItems.length,
      total: formatVndThousands(total_price),
      stt: "1",
      status: orderData.status,
      paymentMethod: orderData.payment_method as string,
      detailUrl: `/orders/${orderData.id}`,
      address: orderData.address as Address,
      orderItems: orderItemsWithProducts,
    };

    return {
      data: finalData,
    };
  } catch (error) {
    console.error(`Failed to fetch order details for ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error details:",
        error.response?.status,
        error.response?.data
      );
      if (error.response?.status === 404) {
        return { data: null };
      }
    }
    return {
      data: null,
    };
  }
}
interface OrderDetailPageProps {
  params: {
    id: string;
  };
}
export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const orderDetails = await getOrderDetails({ id });
  const orderData = orderDetails.data;
  if (!orderData) {
    notFound();
  }
  console.log("Order Data:", orderData);
  let statusClasses =
    "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"; // Base badge styles

  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />

      <div>
        <h1 className="text-3xl font-semibold">
          CHI TIẾT ĐƠN HÀNG #{orderData.code}
        </h1>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-1 mb-4"
        />
      </div>

      <div className="space-y-6  bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className=" space-y-1 grid grid-cols-1 md:grid-cols-2 border-b pb-4 mb-4">
          <div>
            <span className="font-medium text-gray-600">Mã đơn hàng:</span>{" "}
            {orderData.code}
          </div>
          <div>
            <span className="font-medium text-gray-600">Ngày đặt:</span>{" "}
            {new Date(orderData.date).toLocaleDateString("vi-VN")}
          </div>
          <div>
            <span className="font-medium text-gray-600">Trạng thái:</span>
            <span className={statusStyle(orderData.status)}>
              {" "}
              {translateOrderStatusTS(orderData.status)}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">
              Phương thức thanh toán:
            </span>{" "}
            {orderData.paymentMethod}
          </div>
          <div>
            <span className="font-medium text-gray-600">Tổng tiền:</span>{" "}
            <span className="font-bold text-lg text-red-600">
              {orderData.total}
            </span>
          </div>
        </div>

        <div className="border-b pb-4 mb-4 text-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            <span>Địa chỉ giao hàng</span>
          </h2>
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="inline-block w-24 font-medium text-gray-600">
                Họ tên:
              </span>
              {orderData.address.first_name} {orderData.address.last_name}
            </p>
            <p>
              <span className="inline-block w-24 font-medium text-gray-600">
                Điện thoại:
              </span>
              {orderData.address.phone}
            </p>
            {orderData.address.company && (
              <p>
                <span className="inline-block w-24 font-medium text-gray-600">
                  Công ty:
                </span>
                {orderData.address.company}
              </p>
            )}
            <p>
              <span className="inline-block w-24 font-medium text-gray-600 align-top">
                Địa chỉ:
              </span>
              <span className="inline-block max-w-[calc(100%-6rem)]">
                {`${orderData.address.address}, ${orderData.address.city}, ${orderData.address.country}, ${orderData.address.zipcode}`}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Sản phẩm đã đặt
          </h2>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50 text-xs uppercase text-muted-foreground">
                  <TableHead className="w-40 pl-4">Ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead className="text-right">Giá</TableHead>
                  <TableHead className="text-center w-[90px]">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-right pr-4 w-[130px]">
                    Thành tiền
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {orderData.orderItems.map((item) => {
                  const lineTotal = item.quantity * item.product.price;
                  const image = item.product.image;

                  const number = parseInt(
                    image.split("/").pop()?.split(".")[0] ?? "0"
                  );
                  const isImageValid =
                    !isNaN(number) && number <= 15 && number > 0;

                  return (
                    <TableRow key={item.id} className="hover:bg-muted/50 h-52">
                      <TableCell className="pl-4 py-2 ">
                        <div className="relative w-14 h-14 sm:w-40 sm:h-40 bg-gray-100 rounded overflow-hidden border">
                          <Image
                            src={isImageValid ? image : "/images/13.jpg"}
                            width={100}
                            height={100}
                            alt={item.product?.name ?? "Ảnh sản phẩm"}
                            className="object-cover w-40 h-40"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium py-2">
                        {item.product?.name ?? "Sản phẩm không xác định"}
                      </TableCell>
                      <TableCell className="text-right py-2">
                        {formatVndThousands(item.product.price)}
                      </TableCell>
                      <TableCell className="text-center py-2">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-semibold pr-4 py-2">
                        {formatVndThousands(lineTotal)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-end justify-between gap-4">
          <div className="text-right w-full sm:w-auto">
            <span className="text-lg font-semibold text-gray-800">
              Tổng cộng:{" "}
            </span>
            <span className="text-xl font-bold text-red-600">
              {orderData.total}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
