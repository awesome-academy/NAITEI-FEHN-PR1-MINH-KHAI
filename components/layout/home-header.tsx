"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function HomeHeader() {
  const currentPath = usePathname();

  const navLinks = [
    { href: "/", label: "TRANG CHỦ" },
    { href: "/product", label: "RƯỢU VANG ĐỎ" },
    { href: "/product", label: "RƯỢU TRẮNG" },
    { href: "/product", label: "CHAMPAGNE" },
    { href: "/about", label: "THÔNG TIN" },
    { href: "/blog", label: "BLOG" },
    { href: "/contact", label: "LIÊN HỆ" },
  ];
  const topBarLinks = [
    { href: "/profile", label: "Tài khoản của tôi" },
    { href: "/order", label: "Tra cứu đơn hàng" },
    { href: "/fav", label: "Danh sách yêu thích" },
    { href: "/cart", label: "Giỏ hàng" },
    { href: "/auth/sign-in", label: "Đăng nhập" },
    { href: "/auth/sign-up", label: "Đăng ký" },
  ];
  return (
    <header className="w-full">
      <div className="bg-white py-1 text-xs text-gray-600 border-b border-gray-200">
        <div className="container max-w-[1200px] mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            {topBarLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-black hover:underline"
                >
                  {link.label}
                </Link>
                {index < topBarLinks.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm ở đây..."
              className="px-2 py-0.5 border-none italic rounded-sm text-xs focus:outline-none"
            />
            <button className="ml-2 text-gray-500 hover:text-black">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-black py-4">
        <div className="container max-w-[1200px] mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.PNG"
              alt="Drink House Logo"
              width={100}
              height={100}
              className="h-32 w-auto"
              priority
            />
          </Link>

          <nav className="tracking-widest">
            <ul className="flex space-x-12 items-center text-sm font-semibold uppercase">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`
                      hover:text-yellow-500
                      transition-colors duration-200
                      ${
                        currentPath === link.href
                          ? "text-yellow-500"
                          : "text-white"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
