"use client"; // <<< Đánh dấu đây là Client Component

import React, { useState, useMemo } from "react";
import { OrderDataTable } from "./order-data-table"; // Adjust path
import { translateOrderStatusTS } from "@/lib/utils"; // Adjust path
import { ColumnDef } from "@tanstack/react-table"; // Import ColumnDef
import clsx from "clsx"; // Thư viện tiện ích để nối các class name có điều kiện
import { OrderStatusEN } from "@/lib/constants";
import { Order, OrderWithUser, User } from "@/lib/types";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OrderListProps {
  initialOrders: OrderWithUser[];
  columns: ColumnDef<OrderWithUser>[];
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
  const router = useRouter(); // Assuming you are using Next.js router

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
  const handleRefresh = () => {
    router.refresh(); // Trigger a server-side data refresh
    toast.success("Đã làm mới danh sách đơn hàng!");
  };
  return (
    <div className="space-y-4 bg-gray-50 border border-gray-300 rounded p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl">DANH SÁCH ĐƠN HÀNG</h2>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> {/* Optional icon */}
          Làm mới
        </Button>
      </div>

      <div className="text-xs text-gray-600 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-medium mr-1">Trạng thái:</span>
        {filterableStatuses.map((statusKey, index) => (
          <React.Fragment key={statusKey ?? "all"}>
            {index > 0 && <span className="text-gray-300">|</span>}{" "}
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
