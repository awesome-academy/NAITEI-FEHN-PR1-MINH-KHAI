"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CartItemProps } from "@/lib/types/cart";
import axios from "axios";

type CartMainProps = {
  cartItemsData: CartItemProps[];
};

export default function CartMain({ cartItemsData }: CartMainProps) {
  const [cartItems, setCartItems] = useState(cartItemsData);
  const [selectAll, setSelectAll] = useState(false);
  const router = useRouter();

  const updateCartItems = (
    id: string,
    updateFn: (item: CartItemProps) => CartItemProps
  ) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? updateFn(item) : item))
    );
  };

  const incrementQuantity = (id: string) => {
    updateCartItems(id, (item) => ({ ...item, quantity: item.quantity + 1 }));
  };

  const decrementQuantity = (id: string) => {
    updateCartItems(id, (item) =>
      item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
  };

  const updateQuantity = (id: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity) && quantity > 0) {
      updateCartItems(id, (item) => ({ ...item, quantity }));
    }
  };

  const removeItem = async (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    const res = await axios.delete(
      `${process.env.SERVER_API_URL || "http://localhost:5000"}/carts/${id}`
    );
    if (res.status !== 200) {
      console.error("Failed to remove item from cart");
    }
  };

  const handleCreateOrder = async () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }

    try {
      const updatePromises = cartItems.map((item) =>
        axios.patch(
          `${process.env.SERVER_API_URL || "http://localhost:5000"}/carts/${
            item.id
          }`,
          {
            checked: item.selected,
            updated_at: new Date().toISOString(),
          }
        )
      );
      const res = await Promise.all(updatePromises);
      res.forEach((response) => {
        if (response.status !== 200) {
          console.error("Failed to update cart item");
        }
      });
      router.push("/create-order");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  const toggleSelectItem = (id: string) => {
    updateCartItems(id, (item) => ({ ...item, selected: !item.selected }));
    setSelectAll(
      cartItems.every((item) =>
        item.id === id ? !item.selected : item.selected
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(
      cartItems.map((item) => ({ ...item, selected: newSelectAll }))
    );
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const selectedCount = selectedItems.length;
  const selectedTotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const isAnyItemSelected = selectedCount > 0;

  return (
    <div className="bg-white flex flex-col items-center">
      <div className="w-full">
        <div className="bg-gray-100 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-700 text-sm">
            Bạn đã chọn{" "}
            <span className="font-medium">{selectedCount} sản phẩm</span>, Tổng
            tiền:{" "}
            <span className="font-medium text-amber-500">
              {selectedTotal.toLocaleString()}₫
            </span>
          </div>
          <button
            onClick={toggleSelectAll}
            className="bg-black text-white text-xs uppercase py-2 px-4 rounded hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {selectAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
          </button>
        </div>

        <div className="hidden md:block">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                {[
                  "CHỌN",
                  "ẢNH",
                  "TÊN SẢN PHẨM",
                  "GIÁ",
                  "SỐ LƯỢNG",
                  "TỔNG SỐ",
                  "XÓA",
                ].map((header, index) => (
                  <TableHead key={index} className="text-center text-sm">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="w-20 h-20 mx-auto relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center uppercase text-gray-600">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-center text-amber-500">
                    {item.price.toLocaleString()}₫
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="h-6 w-8 border border-gray-300 text-gray-600 bg-gray-200 cursor-pointer flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, e.target.value)
                        }
                        className="h-6 w-10 border-t border-b text-sm border-gray-300 text-center text-gray-600 focus:outline-none"
                      />
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="h-6 w-8 border border-gray-300 text-gray-600 bg-gray-200 cursor-pointer flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-amber-500">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <TrashIcon className="w-5 h-5 mx-auto cursor-pointer" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-4 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-24 h-24 relative flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="h-4 w-4 cursor-pointer"
                    />
                    <h3 className="uppercase text-gray-600 font-medium">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-amber-500 mt-1">
                    {item.price.toLocaleString()}₫
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="h-8 w-10 border border-gray-300 text-gray-600 bg-gray-200 cursor-pointer flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      className="h-8 w-12 border-t border-b text-sm border-gray-300 text-center text-gray-600 focus:outline-none"
                    />
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="h-8 w-10 border border-gray-300 text-gray-600 bg-gray-200 cursor-pointer flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-amber-500 mt-2">
                    Tổng: {(item.price * item.quantity).toLocaleString()}₫
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 text-gray-500 hover:text-gray-700"
                  >
                    <TrashIcon className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-end mt-6 gap-4">
          <button
            disabled={!isAnyItemSelected}
            className={cn(
              "text-white text-xs uppercase py-2 px-4 w-full sm:w-auto rounded transition-colors",
              isAnyItemSelected
                ? "bg-black hover:bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            )}
            onClick={handleCreateOrder}
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
}
