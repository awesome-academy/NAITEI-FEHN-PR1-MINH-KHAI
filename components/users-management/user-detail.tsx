"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserWithAddress } from "@/lib/types/user";
import { formatDisplayDate, translateRoleToVN } from "@/lib/utils";
import { Loader2, AlertCircle } from "lucide-react";
import { Address } from "@/lib/types/address";

interface AdminUserDetailsProps {
  userId: string;
  triggerButton?: React.ReactNode;
}

export default function AdminUserDetails({
  userId,
  triggerButton,
}: AdminUserDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserWithAddress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userId && !userData) {
      const fetchDetails = async () => {
        setIsLoading(true);
        setError(null);
        setUserData(null);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API_URL}/users/${userId}?_embed=addresses`
          );

          if (!res.data || !res.data.id) {
            throw new Error(`Không tìm thấy người dùng với ID ${userId}.`);
          }

          const rawUserData = res.data;
          const addresses = rawUserData.addresses || [];

          const finalData: UserWithAddress = {
            id: rawUserData.id,
            full_name: rawUserData.full_name,
            email: rawUserData.email,
            username: rawUserData.username,
            role: rawUserData.role,
            created_at: rawUserData.created_at,
            updated_at: rawUserData.updated_at,
            addresses: addresses.map((addr: Address) => ({
              id: addr.id,
              first_name: addr.first_name,
              last_name: addr.last_name,
              phone: addr.phone,
              company: addr.company || "",
              address: addr.address,
              city: addr.city,
              country: addr.country,
              zipcode: addr.zipcode,
              created_at: addr.created_at,
              updated_at: addr.updated_at,
            })),
          };

          setUserData(finalData);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Không thể tải chi tiết người dùng.";
          console.error("Lỗi khi tải chi tiết người dùng:", err);
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [isOpen, userId, userData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm">
            Xem chi tiết
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-fit sm:max-w-3xl md:max-w-6xl max-h-[90vh] pr-6 box-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Chi tiết Người dùng #
            {userData?.id.slice(0, 8).toUpperCase() ||
              userId.slice(0, 8).toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của người dùng và danh sách địa chỉ.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2">Đang tải dữ liệu...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col justify-center items-center h-64 text-destructive">
            <AlertCircle className="h-8 w-8 mb-2" />
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="mt-4"
            >
              Đóng
            </Button>
          </div>
        )}

        {userData && !isLoading && !error && (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm border-b pb-4">
              <div>
                <span className="font-medium w-32 inline-block">Họ tên:</span>{" "}
                {userData.full_name}
              </div>
              <div>
                <span className="font-medium w-32 inline-block">Email:</span>{" "}
                {userData.email}
              </div>
              <div>
                <span className="font-medium w-32 inline-block">Username:</span>{" "}
                {userData.username}
              </div>
              <div>
                <span className="font-medium w-32 inline-block">Vai trò:</span>{" "}
                <span
                  className={
                    userData.role === "admin"
                      ? "bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
                      : "bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  }
                >
                  {translateRoleToVN(userData.role)}
                </span>
              </div>
              <div>
                <span className="font-medium w-32 inline-block">Ngày tạo:</span>{" "}
                {formatDisplayDate(userData.created_at)}
              </div>
              <div>
                <span className="font-medium w-32 inline-block">
                  Ngày cập nhật:
                </span>{" "}
                {formatDisplayDate(userData.updated_at)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Danh sách địa chỉ</h3>
              <div className="max-h-[300px] overflow-x-auto sm:max-w-3xl md:max-w-4xl">
                <Table className="min-w-0 w-full border-collapse border border-gray-200 rounded-md">
                  <TableHeader>
                    <TableRow className="bg-gray-100 text-xs uppercase text-muted-foreground border-b">
                      <TableHead className="w-12 text-center px-2 py-2 border-r">
                        STT
                      </TableHead>
                      <TableHead className="min-w-[100px] px-2 py-2 border-r">
                        Họ tên
                      </TableHead>
                      <TableHead className="w-28 text-right px-2 py-2 border-r">
                        Điện thoại
                      </TableHead>
                      <TableHead className="min-w-[150px] px-2 py-2 border-r">
                        Địa chỉ
                      </TableHead>
                      <TableHead className="w-28 text-right px-2 py-2 border-r">
                        Thành phố
                      </TableHead>
                      <TableHead className="min-w-[100px] px-2 py-2 border-r">
                        Công ty
                      </TableHead>
                      <TableHead className="w-28 px-2 py-2 border-r">
                        Quốc gia
                      </TableHead>
                      <TableHead className="w-24 text-center px-2 py-2 border-r">
                        Mã bưu điện
                      </TableHead>
                      <TableHead className="w-28 text-center px-2 py-2 border-r">
                        Ngày tạo
                      </TableHead>
                      <TableHead className="w-28 text-center px-2 py-2">
                        Ngày cập nhật
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-sm">
                    {userData.addresses.length > 0 ? (
                      userData.addresses.map((address, index) => (
                        <TableRow
                          key={address.id}
                          className="hover:bg-muted/50 border-b last:border-b-0"
                        >
                          <TableCell className="w-12 text-center px-2 py-2 border-r">
                            {index + 1}
                          </TableCell>
                          <TableCell className="min-w-[100px] px-2 py-2 border-r truncate">
                            {address.first_name} {address.last_name}
                          </TableCell>
                          <TableCell className="w-28 text-right px-2 py-2 border-r">
                            {address.phone || "N/A"}
                          </TableCell>
                          <TableCell className="min-w-[150px] px-2 py-2 border-r truncate">
                            {address.address || "N/A"}
                          </TableCell>
                          <TableCell className="w-28 text-right px-2 py-2 border-r">
                            {address.city || "N/A"}
                          </TableCell>
                          <TableCell className="min-w-[100px] px-2 py-2 border-r truncate">
                            {address.company || "N/A"}
                          </TableCell>
                          <TableCell className="w-28 px-2 py-2 border-r">
                            {address.country || "N/A"}
                          </TableCell>
                          <TableCell className="w-24 text-center px-2 py-2 border-r">
                            {address.zipcode || "N/A"}
                          </TableCell>
                          <TableCell className="w-28 text-center px-2 py-2 border-r">
                            {new Date(address.created_at).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            ) || "N/A"}
                          </TableCell>
                          <TableCell className="w-28 text-center px-2 py-2">
                            {new Date(address.updated_at).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            ) || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={10}
                          className="text-center py-6 text-muted-foreground"
                        >
                          Không có địa chỉ nào được tìm thấy.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6 gap-2 flex-wrap justify-end">
          {error && (
            <p className="text-sm text-destructive text-left w-full">{error}</p>
          )}
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
