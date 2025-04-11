// src/app/blog/page.tsx (or your route)
import ItemBlog from "@/components/item-blog"; // Adjust path if needed
import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import Image from "next/image";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BlogPost } from "@/lib/types";
import axios from "axios";

async function getBlogsPaginated({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{
  totalCount: number;
  data: BlogPost[];
}> {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_URL
      }/blogs?_expand=user&_embed=comments&_start=${
        (page - 1) * limit
      }&_limit=${limit}`
    );
    const data = res.data.map((blog: any, index: number) => {
      const dateObj = new Date(blog.created_at);

      let formattedDate = dateObj.toLocaleTimeString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return {
        author: blog.user.full_name,
        commentCount: blog.comments.length,
        date: formattedDate,
        id: blog.id as string,
        imageUrl: "/images/wine.jpg",
        title: blog.title,
        description: blog.content,
        href: `/blog/${blog.id}`,
      } as BlogPost;
    });

    return {
      totalCount: parseInt(res.headers["x-total-count"]),
      data: data,
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return {
      totalCount: 0,
      data: [],
    };
  }
}

export default async function BlogPage({ searchParams }: any) {
  const sp = await searchParams;
  const page = parseInt(sp?.page) || 1;
  const postsPerPage = 6;
  const allBlogs = await getBlogsPaginated({
    page: page,
    limit: postsPerPage,
  });

  const totalPosts = allBlogs.totalCount;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const validatedPage = Math.max(1, Math.min(page, totalPages || 1));
  const currentPosts = allBlogs.data;

  const createPageURL = (pageNumber: number | string) => {
    return `/blog?page=${pageNumber}`;
  };

  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-20 md:mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />

      <div>
        <h1 className="text-3xl font-semibold">BLOG</h1>
        <Image
          src={"/images/titleleft-dark.png"}
          alt="title underline"
          width={200}
          height={100}
          className="w-[70px] mt-1 mb-4"
        />
      </div>

      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentPosts.map((post) => (
            <ItemBlog
              key={post.id}
              href={post.href}
              imageUrl={post.imageUrl}
              title={post.title}
              author={post.author}
              date={post.date}
              commentCount={post.commentCount}
              description={post.description}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Không tìm thấy bài viết nào.
        </p>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(validatedPage - 1)}
                aria-disabled={validatedPage <= 1}
                className={
                  validatedPage <= 1
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={page === validatedPage}
                  className=""
                  aria-current={page === validatedPage ? "page" : undefined}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={createPageURL(validatedPage + 1)}
                aria-disabled={validatedPage >= totalPages}
                className={
                  validatedPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
