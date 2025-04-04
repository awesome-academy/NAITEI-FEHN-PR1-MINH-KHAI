import React from "react";
import Image from "next/image";

interface ItemBlogProps {
  imageUrl: string;
  title: string;
  author: string;
  date: string;
  commentCount: number;
  description: string;
}

export default function ItemBlog({
  imageUrl,
  title,
  author,
  date,
  commentCount,
  description,
}: ItemBlogProps) {
  return (
    <div className="bg-white flex flex-col max-w-sm">
      <div className="relative w-full h-64">
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

      <p className="text-gray-600 text-sm line-clamp-4">{description}</p>

      <a href="#" className="text-gray-500 text-sm mt-1 hover:underline">
        Read more
      </a>
    </div>
  );
}
