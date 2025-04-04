import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { OrderStatusVN } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



const statusTranslations: Record<string, OrderStatusVN> = {
  cancelled: "Đã hủy",
  pending: "Đang chờ xử lý",
  shipped: "Đang giao hàng",
  delivered: "Đã giao hàng",
};

export function translateOrderStatusTS(status: string | null | undefined): string {
  // Xử lý đầu vào null, undefined hoặc chuỗi rỗng
  if (!status) {
    return "Không xác định";
  }

  const lowerCaseStatus = status.toLowerCase();
  const translation = statusTranslations[lowerCaseStatus];

  return translation !== undefined ? translation : status;
}


export function formatVndThousands(priceInThousands: number | null | undefined): string {
  if (typeof priceInThousands !== 'number' || isNaN(priceInThousands)) {
    return "N/A";
  }

  try {
    const fullValue = priceInThousands * 1000;


    const formatter = new Intl.NumberFormat('en-US');
    const formattedNumber = formatter.format(fullValue);

    return `${formattedNumber} vnđ`;

  } catch (error) {
    console.error("Lỗi định dạng tiền tệ:", priceInThousands, error);
    return "Lỗi định dạng";
  }
}
