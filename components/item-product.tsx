import React from "react";
import Image from "next/image";

interface ItemProductProps {
  imageUrl: string;
  imageAlt: string;
  productName: string;
  currentPrice: string;
  originalPrice: string;
}

export default function ItemProduct({
  imageUrl,
  imageAlt,
  productName,
  currentPrice,
  originalPrice,
}: ItemProductProps) {
  return (
    <div className="bg-white flex flex-col items-center max-w-xs group">
      <div className="relative w-full h-80 mb-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-contain"
          priority
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black text-white flex items-center justify-between px-4 py-2 opacity-0 group-hover:opacity-100">
          <button className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="text-sm">Yêu thích</span>
          </button>

          <button className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            <span className="text-sm">So sánh</span>
          </button>

          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="text-center font-medium text-gray-800 group-hover:text-amber-500 mt-3 mb-1">
        {productName}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-500 font-medium text-lg">
          {currentPrice}
        </span>
        <span className="text-gray-400 line-through text-sm">
          {originalPrice}
        </span>
      </div>

      <button className="bg-black text-white uppercase text-sm font-medium py-2 px-8 transition-colors w-50 cursor-pointer group-hover:bg-amber-500">
        ADD TO CART
      </button>
    </div>
  );
}
