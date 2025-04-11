"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatVndThousands, translateOrderStatusTS } from "@/lib/utils";
import { Order } from "@/lib/types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.getValue("stt")}</div>,
    size: 50,
  },
  {
    id: "orderInfo",
    header: "MÃ HÓA ĐƠN/NGÀY MUA HÀNG",
    cell: ({ row }) => {
      const order = row.original;

      let formattedDate = "Invalid Date";
      try {
        const dateObj = new Date(order.date);

        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleTimeString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
      } catch (error) {
        console.error("Error processing date:", order.date, error);
      }
      return (
        <div>
          <div className="font-medium">{order.code}</div>
          <div className="text-xs text-muted-foreground ml-2">
            {formattedDate}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">SỐ SP</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("quantity")}</div>
    ),
    size: 80,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-left">TỔNG TIỀN</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {formatVndThousands(row.getValue("total"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "TÌNH TRẠNG",
    cell: ({ row }) => {
      const originalStatus = row.getValue("status") as
        | string
        | null
        | undefined;

      const translatedStatus = translateOrderStatusTS(originalStatus);

      let statusClasses =
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"; // Base badge styles
      const lowerCaseStatus = originalStatus?.toLowerCase();
      switch (lowerCaseStatus) {
        case "delivered":
          statusClasses +=
            " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          break;
        case "cancelled":
          statusClasses +=
            " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          break;
        case "shipped":
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

      return <span className={statusClasses}>{translatedStatus}</span>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">THAO TÁC</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-center">
          <Link
            href={order.detailUrl}
            className="text-blue-600 hover:underline text-xs font-medium"
          >
            Chi tiết
          </Link>
        </div>
      );
    },
    size: 100,
  },
];
