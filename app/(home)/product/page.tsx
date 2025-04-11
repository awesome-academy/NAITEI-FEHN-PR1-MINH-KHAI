import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import React from "react";
import Image from "next/image";
import { Product, ProductItem } from "@/lib/types/product";
import axios from "axios";
import { formatVndThousands } from "@/lib/utils";
import { ProductList } from "@/components/product/product-list";

export async function getProductList(): Promise<ProductItem[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/products`
    );
    const productsData: ProductItem[] = res.data.map((product: Product) => ({
      id: product.id as string,
      imageUrl: product.images[0]?.url || "",
      imageAlt: product.images[0]?.alt || "",
      productName: product.name,
      currentPrice: formatVndThousands(product.price),
      originalPrice: formatVndThousands(
        product.price - (product.price * product.discount) / 100
      ),
      category: product.category,
      subcategory: product.subcategory,
      tags: product.tags,
      description: product.description,
      createdAt: product.created_at,
      point: product.point,
    }));
    return productsData;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductPage() {
  const initialProducts = await getProductList();
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div className="w-full h-[30vh] relative">
        <Image
          src="/images/product-banner.jpg"
          alt="Product Banner"
          layout="fill"
          className="object-cover"
        />
      </div>
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}
