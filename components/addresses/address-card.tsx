"use client";
import { Address, AddressStatusOpenFormEdit } from "@/lib/types/address";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2"; // Nhập sweetalert2

interface AddressCardProps {
  address: Address;
  openFormEditAddress: (id: string) => void;
  setInitAddresses: Dispatch<SetStateAction<AddressStatusOpenFormEdit[]>>;
}

export default function AddressCard({
  address,
  openFormEditAddress,
  setInitAddresses,
}: AddressCardProps) {
  const fieldMapping = [
    { label: "Tên", value: address.first_name },
    { label: "Họ & tên đệm", value: address.last_name },
    { label: "Công ty", value: address.company },
    { label: "Địa chỉ", value: address.address },
    { label: "Thành phố", value: address.city },
    { label: "Quốc Tịch", value: address.country },
    { label: "Postal/Zip Code", value: address.zipcode },
    { label: "Phone", value: address.phone },
  ];

  const removeAddress = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const serverApiUrl =
      process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Địa chỉ này sẽ bị xóa và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverApiUrl}/addresses/${id}`);
          setInitAddresses((prev) =>
            prev.filter((addr) => addr.addressDetail.id !== id)
          );
          Swal.fire({
            title: "Đã xóa!",
            text: "Địa chỉ đã được xóa thành công.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch {
          Swal.fire({
            title: "Lỗi!",
            text: "Không thể xóa địa chỉ. Vui lòng thử lại sau.",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="px-6 py-4">
        {address.default && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Địa chỉ mặc định
            </span>
          </div>
        )}

        <div className="">
          {fieldMapping.map((field, index) => (
            <div key={index} className="flex py-4 border-b border-gray-100">
              <div className="w-1/3 text-gray-500">{field.label}</div>
              <div className="w-2/3 text-gray-600">{field.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-right">
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-2.5 mr-3 focus:outline-none cursor-pointer"
            onClick={() => openFormEditAddress(address.id)}
          >
            Chỉnh sửa địa chỉ
          </button>
          <button
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
            onClick={(e) => removeAddress(e, address.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
