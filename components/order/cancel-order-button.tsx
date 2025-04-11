"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Dùng để refresh
import { toast } from "sonner";

interface CancelOrderButtonProps {
  orderId: string;
  currentStatus: string;
}

export function CancelOrderButtonClient({
  orderId,
  currentStatus,
}: CancelOrderButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const cancellableStatuses = ["pending", "shipped"]; 

  const canCancel = cancellableStatuses.includes(currentStatus);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders/${orderId}`,
        {
          status: "cancelled",
          updated_at: new Date().toISOString(),
        }
      );

      if (response.status === 200 || response.status === 204) {
        console.log(`Order ${orderId} cancelled successfully (Client).`);

        router.refresh();
        toast.success("Đã hủy đơn hàng thành công!", {
          style: {
            background: "green",
            color: "#fff",
          },
          icon: <CheckCircle className="text-white" />,
        });
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Failed to cancel order ${orderId} (Client):`, error);
      let errorMessage = "Đã xảy ra lỗi khi hủy đơn hàng.";
      if (axios.isAxiosError(error)) {
        errorMessage = `Lỗi API: ${
          error.response?.data?.message || error.message
        }`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!canCancel) {
    return null;
  }

  return (
    <Button
      onClick={handleCancel}
      variant="destructive"
      disabled={isLoading}
      aria-disabled={isLoading}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang hủy...
        </>
      ) : (
        "Hủy đơn hàng"
      )}
    </Button>
  );
}
