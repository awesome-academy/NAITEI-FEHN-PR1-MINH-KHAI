"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "RƯỢU VANG ĐỎ",
      price: 345000,
      quantity: 1,
      image: "/images/1.jpg",
    },
    {
      id: 2,
      name: "HUMBLDER THIT BÒ",
      price: 345000,
      quantity: 1,
      image: "/images/2.jpg",
    },
    {
      id: 3,
      name: "HUMBLDER THIT BÒ",
      price: 345000,
      quantity: 1,
      image: "/images/3.jpg",
    },
    {
      id: 4,
      name: "HUMBLDER THIT BÒ",
      price: 345000,
      quantity: 1,
      image: "/images/4.jpg",
    },
  ]);

  const incrementQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const updateQuantity = (id: number, newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col items-start justify-start py-8">
        <div className="text-sm text-gray-500 font-medium flex flex-row items-center mb-8 flex-wrap">
          <p>Trang chủ / Sản phẩm / </p>
          <p className="text-amber-300 ml-1"> Giỏ hàng</p>
        </div>

        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          GIỎ HÀNG
        </h2>
        <div className="relative w-16 h-2 mt-1">
          <Image
            src="/images/titleleft-dark.png"
            alt="line"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full mt-10">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="border-b border-gray-200 text-gray-700">
                  <th className="py-3 px-2 text-center font-normal text-sm border-r border-gray-200">
                    ẢNH
                  </th>
                  <th className="py-3 px-4 text-center font-normal text-sm border-r border-gray-200">
                    TÊN SẢN PHẨM
                  </th>
                  <th className="py-3 px-2 text-center font-normal text-sm border-r border-gray-200">
                    GIÁ
                  </th>
                  <th className="py-3 px-2 text-center font-normal text-sm border-r border-gray-200">
                    SỐ LƯỢNG
                  </th>
                  <th className="py-3 px-2 text-center font-normal text-sm border-r border-gray-200">
                    TỔNG SỐ
                  </th>
                  <th className="py-3 px-2 text-center font-normal text-sm">
                    XÓA
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4 border-r border-gray-200">
                      <div className="w-20 h-20 mx-auto relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center uppercase border-r border-gray-200 text-gray-600">
                      {item.name}
                    </td>
                    <td className="py-4 px-2 text-center border-r border-gray-200">
                      <span className="text-amber-500">
                        {item.price.toLocaleString()}₫
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center border-r border-gray-200 text-gray-600">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="h-6 border border-gray-300 px-2 text-gray-600 bg-gray-200 cursor-pointer"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, e.target.value)
                          }
                          className="h-6 border-t border-b text-sm border-gray-300 w-10 text-center text-gray-600"
                        />
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="h-6 border border-gray-300 px-2 text-gray-600 bg-gray-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center border-r border-gray-200">
                      <span className="text-amber-500">
                        {(item.price * item.quantity).toLocaleString()}₫
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <TrashIcon className="w-5 h-5 mx-auto cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    <h3 className="uppercase text-gray-600 font-medium">
                      {item.name}
                    </h3>
                    <p className="text-amber-500 mt-1">
                      {item.price.toLocaleString()}₫
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="h-8 border border-gray-300 px-3 text-gray-600 bg-gray-200 cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, e.target.value)
                        }
                        className="h-8 border-t border-b text-sm border-gray-300 w-12 text-center text-gray-600"
                      />
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="h-8 border border-gray-300 px-3 text-gray-600 bg-gray-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-amber-500 mt-2">
                      Tổng: {(item.price * item.quantity).toLocaleString()}₫
                    </p>
                    <button
                      className="mt-2 text-gray-500 hover:text-gray-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <TrashIcon className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-end mt-6 gap-4">
            <button className="bg-black text-white text-xs uppercase py-2 px-4 w-full sm:w-auto">
              Tiếp tục mua hàng
            </button>
            <button className="bg-black text-white text-xs uppercase py-2 px-8 w-full sm:w-auto">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
