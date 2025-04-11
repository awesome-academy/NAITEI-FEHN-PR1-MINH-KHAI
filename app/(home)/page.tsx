import React from "react";
import Image from "next/image";
import ItemProduct from "@/components/item-product";
import ItemBlog, { ItemBlogProps } from "@/components/item-blog";
import { Quote } from "lucide-react";
import { ProductItem } from "@/lib/types/product";
import { getProductList } from "@/app/(home)/product/page";

export default async function Home() {
  const products: ProductItem[] = await getProductList();

  const newestProductsRaw = [...products]
    .filter(
      (p) => p.createdAt && !isNaN(new Date(p.createdAt.slice(0, 23)).getTime())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt!.slice(0, 23)).getTime() -
        new Date(a.createdAt!.slice(0, 23)).getTime()
    )
    .slice(0, 8);

  const bestSellingProductsRaw = [...products]
    .filter((p) => typeof p.point === "number")
    .sort((a, b) => (b.point ?? 0) - (a.point ?? 0))
    .slice(0, 8);

  const newestProducts =
    newestProductsRaw.length > 0 ? newestProductsRaw : products.slice(0, 8);

  const bestSellingProducts =
    bestSellingProductsRaw.length > 0
      ? bestSellingProductsRaw
      : products.slice(0, 8);

  const blogs: ItemBlogProps[] = [
    {
      imageUrl: "/images/blog1.jpg",
      title: "VANG THĂNG LONG CLASSIC",
      author: "Giangle",
      date: "30/06/2015",
      commentCount: 60,
      description:
        "Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả...",
      href: "/blog/vang-thang-long-classic-1",
    },
    {
      imageUrl: "/images/blog1.jpg",
      title: "VANG THĂNG LONG CLASSIC",
      author: "Giangle",
      date: "30/06/2015",
      commentCount: 60,
      description:
        "Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự nhiên từ hoa quả...",
      href: "/blog/vang-thang-long-classic-2",
    },
  ];

  const slides: string[] = [
    "/images/slide-1.jpg",
    "/images/slide-2.jpg",
    "/images/slide-3.jpg",
    "/images/slide-4.jpg",
    "/images/slide-4.jpg",
    "/images/slide-3.jpg",
    "/images/slide-2.jpg",
    "/images/slide-1.jpg",
  ];

  return (
    <div className="bg-white flex flex-col items-center max-w-screen min-h-screen">
      <div className="relative w-full min-h-[40vh] md:min-h-[50vh] lg:min-h-[68vh] z-10">
        <Image
          src="/images/banner.jpg"
          alt="banner"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 md:h-2/3 w-3/4 md:w-2/3 lg:w-1/2">
          <Image
            src="/images/banner-text.png"
            alt="banner-text"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-center w-full py-8 md:py-14">
        <div className="absolute -top-15 left-0 w-20 md:w-26/100 h-80 md:h-120 hidden sm:block">
          <Image
            src="/images/nho1.jpg"
            alt="nho"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute top-0 right-0 w-20 md:w-50 h-40 md:h-58 hidden sm:block">
          <Image
            src="/images/nho2.png"
            alt="nho"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full sm:w-11/12 md:w-3/4 max-w-5xl mx-auto text-center p-4 md:p-6 flex flex-col items-center">
          <div className="relative mb-2">
            <span className="text-lg md:text-xl font-medium text-gray-800">
              GIỚI THIỆU
            </span>
          </div>

          <div className="relative w-32 md:w-38 h-2 mb-3 md:mb-5">
            <Image
              src="/images/title-dark.png"
              alt="line"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 md:mb-8 z-10">
            <span>
              Mirure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugiat nulla
              facilisi. Nam liber tempor cum soluta nobis eleifend option congue
              nihil imperdiet doming id quod mazim placerat facer possim assum.
              Typi non habent claritatem insitam; est usus legentis in iis qui
              facietorum claritatem. Investigationes demonstraverunt lectores
              legere me lius quod ii legunt saepius. Claritas est etiam
              processus dynamicus, qui sequitur mutationem consuetudium
              lectorum. Mirum est notare quam littera gothica, quam nunc putam.
            </span>
          </div>

          <button className="bg-black text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold hover:bg-gray-800 transition">
            <span>XEM THÊM</span>
          </button>
        </div>

        <div className="relative min-w-full sm:min-w-[90vw] md:min-w-[80vw] lg:min-w-[60vw] min-h-[50vh] sm:min-h-[60vh] md:min-h-[72vh] mx-auto mt-10 md:mt-20 bg-[url('/images/nho-banner.jpg')] bg-cover bg-center z-10">
          <div className="absolute top-[180px] sm:top-[250px] md:top-[345px] left-1/2 w-11/12 sm:w-5/6 h-[50vh] sm:h-[60vh] md:h-[64vh] z-20 bg-white -translate-x-1/2 px-4 sm:px-8 md:px-16 lg:px-[100px] py-8 sm:py-12 md:py-[95px]">
            <div className="flex flex-col md:flex-row justify-center w-full h-full bg-white">
              <div className="relative w-full md:w-2/3 h-40 sm:h-64 md:h-full items-center mb-6 md:mb-0">
                <Image
                  src="/images/alpatago.jpg"
                  alt="nho"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col w-full md:w-1/3 justify-start items-center md:items-start mx-auto text-center md:text-left">
                <h2 className="text-lg sm:text-xl font-medium text-gray-900 flex items-center justify-center gap-2">
                  RƯỢU NHO NĂM 1987
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

                <p className="text-2xl sm:text-3xl text-amber-300 font-medium mt-4 md:mt-5">
                  330.000đ
                </p>

                <button className="bg-black text-white uppercase text-xs sm:text-sm font-medium py-1 px-4 sm:px-6 hover:bg-gray-800 transition mt-3 md:mt-4">
                  ADD TO CART
                </button>

                <p className="text-gray-700 text-xs leading-relaxed mt-4 md:mt-6 text-center md:text-start">
                  Một hợp chất có trong rượu vang được gọi là resveratro có khả
                  năng làm tăng tối đa tuổi thọ. Resveratro còn có khả năng ngăn
                  chặn mất độ oxy hóa của protein béo.
                </p>

                <div className="w-full grid grid-cols-2 mt-8 md:mt-12 text-amber-300 text-xl sm:text-2xl font-medium">
                  <div className="border text-amber-300 py-2 md:py-3">
                    <p>334</p>
                    <p className="text-xs sm:text-sm">NGÀY</p>
                  </div>
                  <div className="border text-amber-300 py-2 md:py-3">
                    <p>26</p>
                    <p className="text-xs sm:text-sm">GIỜ</p>
                  </div>
                  <div className="border text-amber-300 py-2 md:py-3">
                    <p>60</p>
                    <p className="text-xs sm:text-sm">PHÚT</p>
                  </div>
                  <div className="border text-amber-300 py-2 md:py-3">
                    <p>15</p>
                    <p className="text-xs sm:text-sm">GIÂY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full sm:min-w-[90vw] md:min-w-[80vw] lg:min-w-[60vw] max-w-5xl mx-auto text-center p-4 md:p-6 flex flex-col items-center mt-[40vh] sm:mt-[30vh] md:mt-[26vh]">
          <div className="relative mb-2">
            <span className="text-lg md:text-xl font-medium text-gray-800">
              SẢN PHẨM MỚI
            </span>
          </div>

          <div className="relative w-32 md:w-38 h-2 mb-3 md:mb-5">
            <Image
              src="/images/title-dark.png"
              alt="line"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] flex flex-col sm:flex-nowrap sm:flex-row mt-5 gap-6 sm:gap-2 md:gap-4 sm:overflow-x-auto sm:scrollbar-hide sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
            {newestProducts.map((product, index) => (
              <div
                className="w-full sm:flex-shrink-0 sm:w-1/3 md:w-1/4 mb-6 sm:mb-0"
                key={index}
              >
                <ItemProduct {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-2 mt-5">
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-40 sm:h-48 md:h-68">
              <Image
                src={slide}
                alt="line"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col justify-start items-center w-full py-8 md:py-14">
        <div className="min-w-full sm:min-w-[90vw] md:min-w-[80vw] lg:min-w-[60vw] max-w-5xl mx-auto text-center p-4 md:p-6 flex flex-col items-center mt-3 md:mt-5">
          <div className="relative mb-2">
            <span className="text-lg md:text-xl font-medium text-gray-800">
              SẢN PHẨM BÁN CHẠY
            </span>
          </div>

          <div className="relative w-32 md:w-38 h-2 mb-3 md:mb-5">
            <Image
              src="/images/title-dark.png"
              alt="line"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] flex flex-col sm:flex-nowrap sm:flex-row mt-5 gap-6 sm:gap-2 md:gap-4 sm:overflow-x-auto sm:scrollbar-hide sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
            {bestSellingProducts.map((product, index) => (
              <div
                className="w-full sm:flex-shrink-0 sm:w-1/3 md:w-1/4 mb-6 sm:mb-0"
                key={index}
              >
                <ItemProduct {...product} />
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-full sm:min-w-[90vw] md:min-w-[80vw] lg:min-w-[60vw] max-w-5xl mx-auto text-center p-4 md:p-6 flex flex-col lg:flex-row justify-center gap-6 mt-6 md:mt-10">
          <div className="flex w-full lg:w-2/3 flex-col items-center">
            <div className="relative mb-2">
              <span className="text-lg md:text-xl font-medium text-gray-800">
                TIN TỨC & BLOG
              </span>
            </div>

            <div className="relative w-32 md:w-38 h-2 mb-3 md:mb-5">
              <Image
                src="/images/title-dark.png"
                alt="line"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-2 md:px-4 mt-3 md:mt-5">
              {blogs.map((blog, index) => (
                <ItemBlog key={index} {...blog} />
              ))}
            </div>
          </div>

          <div className="flex w-full lg:w-1/3 flex-col items-center mt-8 lg:mt-0">
            <div className="relative mb-2">
              <span className="text-lg md:text-xl font-medium text-gray-800">
                KHÁCH HÀNG
              </span>
            </div>

            <div className="relative w-32 md:w-38 h-2 mb-3 md:mb-5">
              <Image
                src="/images/title-dark.png"
                alt="line"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-12 h-12 md:w-15 md:h-15 bg-yellow-400 rounded-full flex items-center justify-center mb-3 md:mb-4 mt-3 md:mt-4">
              <Quote />
            </div>

            <p className="text-center text-gray-600 text-xs md:text-sm mb-1 mt-2 md:mt-3 max-w-md lg:max-w-none">
              Vang nổ Thăng Long có hương vị đặc trưng của sản phẩm lên men tự
              nhiên từ hoa quả với độ rượu nhẹ, bọt ga đầy...
            </p>
            <a
              href="#"
              className="text-gray-500 text-xs md:text-sm font-medium mb-4 md:mb-6 hover:underline"
            >
              Read more
            </a>

            <div className="relative w-20 h-20 md:w-25 md:h-25 mb-3 md:mb-4">
              <Image
                src="/images/avatar.jpg"
                alt="Giang LT"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <span className="text-xs md:text-sm font-medium text-gray-800">
              GIANG LT
            </span>
            <p className="text-xs italic text-gray-500">Graphic design</p>
          </div>
        </div>
      </div>
    </div>
  );
}
