import { IconType } from "react-icons/lib";
import { RiHomeLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
export const ROUTES = [
  {
    href: "/",
    label: "Trang chủ",
  },
  {
    href: "/product",
    label: "Sản phẩm",
  },
  {
    href: "/order",
    label: "Đơn hàng",
  },
  {
    href: "/about",
    label: "Giới thiệu",
  },
  {
    href: "/contact",
    label: "Liên hệ",
  },
  {
    href: "/blog",
    label: "Tin tức",
  },
  {
    href: "/ho-tro",
    label: "Hỗ trợ",
  },
  {
    href: "/tai-khoan",
    label: "Tài khoản",
  },
  {
    href: "/cart",
    label: "Giỏ hàng",
  },
  {
    href: "/addresses",
    label: "Địa chỉ",
  },
  {
    href: "/auth/sign-in",
    label: "Đăng nhập",
  },
  {
    href: "/auth/sign-up",
    label: "Đăng ký",
  },
];

export type NavigationItem = {
  label: string;
  icon: IconType;
  href: string;
  tooltip: string;
};
export const navigation: NavigationItem[] = [
  {
    label: "Trang chủ",
    icon: RiHomeLine,
    href: "/admin",
    tooltip: "Trang chủ",
  },
  {
    label: "Người dùng",
    icon: HiOutlineUserGroup,
    href: "/admin/user",
    tooltip: "Người dùng",
  },
  {
    label: "Sản phẩm",
    icon: AiFillProduct,
    href: "/admin/product",
    tooltip: "Sản phẩm",
  },
  {
    label: "Đơn hàng",
    icon: MdOutlineShoppingCart,
    href: "/admin/order",
    tooltip: "Đơn hàng",
  },
];

export type OrderStatusEN = "cancelled" | "pending" | "shipped" | "delivered";

export type OrderStatusVN =
  | "Đã hủy"
  | "Đang chờ xử lý"
  | "Đang giao hàng"
  | "Đã giao hàng";

export type RoleEN = "user" | "admin";

export type RoleVN = "Khách hàng" | "Quản trị viên";
