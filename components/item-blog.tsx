import React from "react";
import Image from "next/image";

export interface ItemBlogProps {
  imageUrl: string;
  title: string;
  author: string;
  date: string;
  commentCount: number;
  description: string;
  href?: string; // Optional href prop for the link
}

export default function ItemBlog({
  imageUrl,
  title,
  author,
  date,
  commentCount,
  href,
  description,
}: ItemBlogProps) {
  return (
    <div className="bg-white flex flex-col max-w-sm text-start">
      <div className="relative w-full h-56">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h3 className="text-gray-800 font-medium text-lg mt-3 mb-1">{title}</h3>

      <p className="text-gray-500 text-xs mb-2">
        Đăng bởi {author} | {date} | {commentCount} bình luận
      </p>

      <p className="text-gray-600 text-sm line-clamp-4 text-start">
        {description}
      </p>

      <a href={href} className="text-gray-500 text-sm mt-1 hover:underline">
        Read more
      </a>
    </div>
  );
}
