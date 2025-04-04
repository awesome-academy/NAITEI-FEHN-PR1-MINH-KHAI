import React from "react";
import Image from "next/image"; // Sử dụng Next.js Image component nếu có ảnh thực tế
import { Input } from "@/components/ui/input"; // Import Input từ Shadcn UI
import { Button } from "@/components/ui/button"; // Import Button từ Shadcn UI
import { MapPin, Phone, Mail, Rss } from "lucide-react"; // Import icons
import {
  FaTwitter,
  FaLinkedinIn,
  FaRss,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";
export default function HomeFooter() {
  return (
    <footer className="bg-white text-sm text-gray-700">
      <div className="container max-w-[1200px]  border-b-2 border-gray-200 mx-auto px-4  grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
        <div
          className={`  w-full h-48 flex items-center justify-center md:border-r-2 border-gray-200 `}
        >
          <Image
            src="/authentic.png"
            alt="Logo"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>
        <div
          className={`  w-full h-48 flex items-center justify-center md:border-r-2 border-gray-200 `}
        >
          <Image
            src="/retrobrand.png"
            alt="Logo"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>
        <div className={`  w-full h-48 flex items-center justify-center `}>
          <Image
            src="/bearbrand.png"
            alt="Logo"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 py-10 pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
        <div className="space-y-3">
          <div className="flex flex-row justify-between ">
            <div className="space-y-3">
              <h3 className=" text-xl  mb-4 text-gray-900 uppercase tracking-widest">
                Thông tin
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Giao hàng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Cài đặt
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Lưu trữ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Chính sách riêng tư
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className=" text-xl  mb-4  uppercase tracking-widest">
                Mua hàng
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Vận chuyển và tra hàng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Mua hàng an toàn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Vận quốc tế
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Liên kết
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors text-gray-500"
                  >
                    Dịch vụ giảm giá
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className=" text-xl  mb-4 text-gray-900 uppercase tracking-widest">
            Gửi Email
          </h3>
          <p className="mb-3 text-gray-500">
            Gửi email cho chúng tôi để được hỗ trợ
          </p>
          <form className="flex items-center mb-4">
            <Input
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
              className="rounded-r-none focus-visible:ring-offset-0 focus-visible:ring-0 border-r-0 h-9"
              aria-label="Email address"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-gray-800 hover:bg-black text-white px-4 h-9"
            >
              GỬI
            </Button>
          </form>
          <div className="flex space-x-3 text-gray-500">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-black transition-colors"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-black transition-colors"
            >
              <TiSocialGooglePlus size={18} />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="hover:text-black transition-colors"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="#"
              aria-label="RSS Feed"
              className="hover:text-black transition-colors"
            >
              <FaRss size={18} />
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className=" text-xl  mb-4 text-gray-900 uppercase tracking-widest">
            Liên hệ
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <MapPin
                size={18}
                className="mr-2 mt-0.5 flex-shrink-0 text-gray-600"
              />
              <span className="text-gray-500">
                Tầng 4, Tòa nhà Hanoi Group, Số 442 Đội Cấn, P. Cống Vị, Q. Ba
                Đình, Hà Nội
              </span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-2 flex-shrink-0 text-gray-600" />
              <span className="text-gray-500">
                (024) 6674 2332 - (024) 3786 8904
              </span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-2 flex-shrink-0 text-gray-600" />
              <a
                href="mailto:support@example.com"
                className="hover:text-black transition-colors text-gray-500"
              >
                support@bizweb.vn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container max-w-[1200px] border-t-2 border-gray-200    mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs ">
        <p className="mb-2 md:mb-0 text-center md:text-left">
          © Copyright 2008-2014 DKT Technology JSC
        </p>
        <div className="flex space-x-6  items-center">
          {/* Thay thế PlaceholderPaymentIcon bằng component Image hoặc img */}
          <FaCcMastercard size={30} className="hover:text-red-400" />
          <FaCcVisa size={30} className="hover:text-red-400" />
          <FaCcPaypal size={30} className="hover:text-red-400" />
        </div>
      </div>
    </footer>
  );
}
