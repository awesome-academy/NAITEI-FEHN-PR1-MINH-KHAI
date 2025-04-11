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


export function statusStyle(status: string | null | undefined): string {
  let statusClasses =
  "inline-block px-3 py-1 rounded-full font-medium";
  const lowerCaseStatus = status?.toLowerCase();
  switch (lowerCaseStatus) {
        case "delivered": // Green for success
          statusClasses +=
            " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          break;
        case "cancelled": // Red for cancellation/failure
          statusClasses +=
            " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          break;
        case "shipped": // Blue for in-progress/informational
          statusClasses +=
            " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
          break;
        case "pending":
          statusClasses +=
            " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
          break;
        default:
          statusClasses +=
            " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
          break;
      }

  return statusClasses;
}
