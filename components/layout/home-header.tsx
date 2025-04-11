"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function HomeHeader() {
  const { currentUser, logout } = useAuth();
  const currentPath = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [currentMenu, setCurrentMenu] = useState<any | null>(null);

  const sampleSubmenuLinks = [
    { href: "/ruou-chivas", label: "Rượu Chivas" },
    { href: "/hang-doc", label: "Hàng độc - Rượu độc đáo" },
    { href: "/johnnie-walker", label: "Johnnie Walker" },
    { href: "/ruou-whisky", label: "Rượu Whisky" },
    { href: "/remy-martin", label: "Rượu Remy Martin" },
    { href: "/glenmorangie", label: "Rượu Glenmorangie" },
  ];

  const navLinks = [
    { href: "/", label: "TRANG CHỦ" },
    {
      href: "/product",
      label: "RƯỢU VANG ĐỎ",
      submenu: [
        {
          title: "RƯỢU VANG",
          links: sampleSubmenuLinks,
          image: "/images/brown_wine.jpg",
        },
        {
          title: "RƯỢU NGOẠI",
          links: sampleSubmenuLinks,
          image: "/images/wine.jpg",
        },
      ],
    },
    { href: "/product", label: "RƯỢU TRẮNG" },
    { href: "/product", label: "CHAMPAGNE" },
    { href: "/about", label: "THÔNG TIN" },
    { href: "/blog", label: "BLOG" },
    { href: "/contact", label: "LIÊN HỆ" },
  ];

  const topBarLinks = currentUser
    ? [
        { href: "/profile", label: "Tài khoản của tôi" },
        { href: "/order", label: "Tra cứu đơn hàng" },
        { href: "/fav", label: "Danh sách yêu thích" },
        { href: "/cart", label: "Giỏ hàng" },
        { href: "#", label: "Đăng xuất", onClick: logout },
      ]
    : [
        { href: "/auth/sign-in", label: "Đăng nhập" },
        { href: "/auth/sign-up", label: "Đăng ký" },
      ];

  const handleMouseEnter = (href: string) => {
    const link = navLinks.find((l) => l.href === href);
    if (link?.submenu) {
      setOpenSubmenu(href);
      setCurrentMenu(link.submenu[0]);
    }
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  return (
    <header className="w-full" onMouseLeave={handleMouseLeave}>
      <div className="bg-white py-1 text-xs text-gray-600 border-b border-gray-200">
        <div className="container max-w-[1200px] mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            {topBarLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {link.label === "Đăng xuất" && link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="hover:text-black hover:underline text-xs cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="hover:text-black hover:underline text-xs"
                  >
                    {link.label}
                  </Link>
                )}
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

      <div className="bg-black py-4 relative">
        <div className="container max-w-[1200px] mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.PNG"
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
                <li
                  key={link.label}
                  onMouseEnter={() => handleMouseEnter(link.href)}
                >
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

                  {link.submenu && openSubmenu === link.href && (
                    <div
                      className="
                        absolute top-full mt-0
                        left-[1/2] -translate-x-[20%]
                        bg-white shadow-lg rounded-b-md
                        text-black text-left normal-case font-normal
                        p-6 z-20 border border-yellow-500
                        min-w-[800px]
                      "
                    >
                      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                        {link.submenu.map((item, index) => (
                          <div
                            key={index}
                            onMouseEnter={() => setCurrentMenu(item)}
                          >
                            <div>
                              <h4 className="font-semibold text-base mb-3 uppercase border-b pb-1 border-gray-200">
                                {item.title}
                              </h4>
                              <ul className="space-y-2">
                                {item.links!.map((sublink) => (
                                  <li key={sublink.href}>
                                    <Link
                                      href={sublink.href}
                                      className="block text-sm text-gray-700 hover:text-yellow-600 hover:underline"
                                    >
                                      {sublink.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                        {currentMenu && (
                          <div className="overflow-hidden rounded h-[200px] w-[300px]">
                            <Image
                              src={currentMenu.image}
                              alt={"placeholder"}
                              width={200}
                              height={150}
                              className="object-cover h-full w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
