"use client";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import {
  AddressFormInput,
  AddressStatusOpenFormEdit,
} from "@/lib/types/address";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

interface AddressAddFormProps {
  id: number;
  handleRemoveForm: (id: number) => void;
  setInitAddresses: Dispatch<SetStateAction<AddressStatusOpenFormEdit[]>>;
  addressesData: AddressStatusOpenFormEdit[];
}

export default function AddressAddForm({
  id,
  handleRemoveForm,
  setInitAddresses,
  addressesData,
}: AddressAddFormProps) {
  const { currentUser } = useAuth();
  const [userAddress, setAddress] = useState<AddressFormInput>({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
    phone: "",
    default: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(0|\+84)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serverApiUrl =
      process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
    const requiredFields = [
      "first_name",
      "last_name",
      "company",
      "address",
      "city",
      "country",
      "zipcode",
      "phone",
    ];

    for (const field of requiredFields) {
      if (!userAddress[field as keyof AddressFormInput]) {
        toast.error("Vui lòng điền đầy đủ tất cả các trường bắt buộc!", {
          style: {
            background: "red",
            color: "#fff",
          },
        });
        return;
      }
    }

    if (!validatePhone(userAddress.phone)) {
      toast.error("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng!", {
        style: {
          background: "red",
          color: "#fff",
        },
      });
      return;
    }

    try {
      const currentTime = new Date().toISOString();
      const {
        first_name,
        last_name,
        company,
        address,
        city,
        country,
        zipcode,
        phone,
        default: isDefault,
      } = userAddress;

      const userNewAddress = {
        userId: currentUser.id,
        first_name,
        last_name,
        company,
        address,
        city,
        country,
        zipcode,
        phone,
        default: isDefault,
        created_at: currentTime,
        updated_at: currentTime,
      };

      const response = await axios.post(
        `${serverApiUrl}/addresses`,
        userNewAddress
      );

      if (response.status === 201 || response.status === 200) {
        if (userAddress.default) {
          const defaultAddress = addressesData.find(
            (addressData) => addressData.addressDetail.default
          );
          if (defaultAddress) {
            await axios.patch(
              `${serverApiUrl}/addresses/${defaultAddress.addressDetail.id}`,
              {
                default: false,
              }
            );
            setInitAddresses((prev) =>
              prev.map((addr) =>
                addr.addressDetail.id === defaultAddress.addressDetail.id
                  ? {
                      ...addr,
                      addressDetail: { ...addr.addressDetail, default: false },
                    }
                  : addr
              )
            );
          }
        }

        setInitAddresses((prev) => [
          {
            addressDetail: {
              ...userNewAddress,
              id: response.data.id,
            },
            openFormEdit: false,
          },
          ...prev,
        ]);
        setAddress({
          first_name: "",
          last_name: "",
          company: "",
          address: "",
          city: "",
          country: "",
          zipcode: "",
          phone: "",
          default: false,
        });
        toast.success("Thêm địa chỉ thành công!", {
          style: {
            background: "green",
            color: "#fff",
          },
          icon: <CheckCircle2 className="text-white" />,
        });
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Có lỗi xảy ra khi đăng ký, vui lòng thử lại.";
      if (axios.isAxiosError(error)) {
        errorMessage = `Lỗi API: ${
          error.response?.data?.message || error.message
        }`;
      }
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  };

  const renderInputField = (
    label: string,
    name: keyof AddressFormInput,
    type: string = "text"
  ) => (
    <div className="flex flex-row items-center">
      <label className="mb-1 text-sm font-medium text-gray-700 w-1/4">
        {label}
      </label>
      <Input
        name={name}
        value={String(userAddress[name])}
        onChange={handleChange}
        type={type}
        className="flex-1 rounded"
      />
    </div>
  );

  return (
    <div className="w-full mx-auto py-8 pl-15">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {renderInputField("Tên", "first_name")}
          {renderInputField("Họ & tên đệm", "last_name")}
          {renderInputField("Công ty", "company")}
          {renderInputField("Địa chỉ", "address")}
          {renderInputField("Thành phố", "city")}
          {renderInputField("Quốc Tịch", "country")}
          {renderInputField("Postal/Zip Code", "zipcode")}
          {renderInputField("Phone", "phone", "tel")}

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="default"
              name="default"
              checked={userAddress.default}
              onChange={handleChange}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="default" className="ml-2 text-sm text-gray-700">
              Đặt làm địa chỉ mặc định?
            </label>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 text-sm font-medium rounded cursor-pointer"
            >
              Thêm địa chỉ
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 text-sm font-medium rounded cursor-pointer"
              onClick={() => handleRemoveForm(id)}
            >
              Thoát
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
