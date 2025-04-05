"use client"; // <<< Đánh dấu đây là Client Component

import React, { useState, useMemo } from "react";
import { Order, columns } from "./column"; // Adjust path, đảm bảo OrderStatusEN được export từ column.ts hoặc định nghĩa ở đây
import { OrderDataTable } from "./order-data-table"; // Adjust path
import { translateOrderStatusTS } from "@/lib/utils"; // Adjust path
import { ColumnDef } from "@tanstack/react-table"; // Import ColumnDef
import clsx from "clsx"; // Thư viện tiện ích để nối các class name có điều kiện
import { OrderStatusEN } from "@/lib/constants";

interface OrderListProps {
  initialOrders: Order[];
  columns: ColumnDef<Order>[];
}

const filterableStatuses: (OrderStatusEN | null)[] = [
  null,
  "cancelled",
  "pending",
  "shipped",
  "delivered",
];

export function OrderList({ initialOrders, columns }: OrderListProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusEN | null>(
    null
  );

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filterableStatuses.forEach((statusKey) => {
      if (statusKey === null) return;
      const count = initialOrders.filter(
        (order) => order.status === statusKey
      ).length;
      counts[translateOrderStatusTS(statusKey)] = count;
    });
    counts["Tất cả"] = initialOrders.length;
    return counts;
  }, [initialOrders]);

  const displayedOrders = useMemo(() => {
    if (selectedStatus === null) {
      return initialOrders;
    }
    return initialOrders.filter((order) => order.status === selectedStatus);
  }, [initialOrders, selectedStatus]);

  const handleFilterClick = (status: OrderStatusEN | null) => {
    setSelectedStatus(status);
  };

  const getFilterButtonText = (statusKey: OrderStatusEN | null): string => {
    if (statusKey === null) {
      return `Tất cả (${statusCounts["Tất cả"] ?? 0})`;
    }
    const translated = translateOrderStatusTS(statusKey);
    return `${translated} (${statusCounts[translated] ?? 0})`;
  };

  return (
    <div className="space-y-4 bg-gray-50 border border-gray-300 rounded p-4">
      <h2 className="text-xl font-semibold border-b pb-2">
        DANH SÁCH ĐƠN HÀNG
      </h2>

      <div className="text-xs text-gray-600 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-medium mr-1">Trạng thái:</span>
        {filterableStatuses.map((statusKey, index) => (
          <React.Fragment key={statusKey ?? "all"}>
            {index > 0 && <span className="text-gray-300">|</span>}{" "}
            {/* Thêm dấu | ngăn cách */}
            <button
              onClick={() => handleFilterClick(statusKey)}
              className={clsx(
                "hover:underline hover:text-yellow-500 whitespace-nowrap focus:outline-none",
                {
                  "font-bold text-yellow-600": selectedStatus === statusKey, // Highlight nếu đang được chọn
                }
              )}
            >
              {getFilterButtonText(statusKey)}
            </button>
          </React.Fragment>
        ))}
      </div>

      <OrderDataTable columns={columns} data={displayedOrders} />
    </div>
  );
}
