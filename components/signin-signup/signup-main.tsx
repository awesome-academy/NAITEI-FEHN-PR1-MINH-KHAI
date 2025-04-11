"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LabeledInput from "@/components/signin-signup/input-label";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscribeToNewsletter: boolean;
}

export default function SignUpMain() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscribeToNewsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serverApiUrl = process.env.SERVER_API_URL || "http://localhost:5000";
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof RegistrationFormData]) {
        alert("Vui lòng điền đầy đủ tất cả các trường bắt buộc!");
        return;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    try {
      const response = await axios.get(`${serverApiUrl}/users`, {
        params: { email: formData.email },
      });
      if (response.data.length > 0) {
        alert("Email này đã được sử dụng, vui lòng chọn email khác!");
        return;
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
      alert("Có lỗi xảy ra khi kiểm tra email, vui lòng thử lại sau.");
      return;
    }

    try {
      const currentTime = new Date().toISOString();
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        subscribeToNewsletter,
      } = formData;
      const userData = {
        full_name: `${firstName} ${lastName}`,
        username,
        email,
        password,
        subscribeToNewsletter,
        role: "user",
        created_at: currentTime,
        updated_at: currentTime,
      };

      const response = await axios.post(`${serverApiUrl}/users`, userData);
      console.log("Đăng ký thành công:", response.data);
      alert("Đăng ký thành công!");
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      alert("Có lỗi xảy ra khi đăng ký, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="w-full mx-auto py-2">
      <div className="border border-gray-200 p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-lg font-medium uppercase mb-6">
              THÔNG TIN CÁ NHÂN
            </h2>

            <LabeledInput
              label="Tên trước"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <LabeledInput
              label="Tên sau"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <LabeledInput
              label="Tài khoản"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <LabeledInput
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="subscribeToNewsletter"
                name="subscribeToNewsletter"
                checked={formData.subscribeToNewsletter}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label
                htmlFor="subscribeToNewsletter"
                className="text-gray-600 cursor-pointer"
              >
                Đăng ký nhận bản tin
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium uppercase mb-6">
              THÔNG TIN ĐĂNG NHẬP
            </h2>

            <LabeledInput
              label="Mật khẩu"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              showToggle
            />

            <LabeledInput
              label="Xác nhận mật khẩu"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              showToggle
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 uppercase font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
            >
              GỬI
            </button>
            <button
              type="button"
              className="bg-black text-white px-6 py-2 uppercase font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => window.history.back()}
            >
              QUAY LẠI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
