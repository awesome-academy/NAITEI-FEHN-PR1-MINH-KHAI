"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import LabeledInput from "@/components/signin-signup/input-label";

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignInMain() {
  const { setCurrentUser } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const serverApiUrl =
        process.env.SERVER_API_URL || "http://localhost:5000";
      const res = await axios.get(`${serverApiUrl}/users`, {
        params: {
          email: formData.email,
          password: formData.password,
        },
      });
      const users = res.data;

      if (users.length === 0) {
        alert("Sai email hoặc mật khẩu");
        return;
      }

      const user = users[0];
      Cookies.set("user", JSON.stringify(user));
      setCurrentUser(user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="border border-gray-200 p-8 w-full mt-2">
      <h2 className="text-lg font-medium uppercase mb-2">
        KHÁCH HÀNG ĐĂNG NHẬP
      </h2>
      <p className="text-gray-600 mb-8">
        Nếu bạn có một tài khoản, xin vui lòng đăng nhập.
      </p>

      <form onSubmit={handleSubmit}>
        <LabeledInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

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

        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="mr-2 h-4 w-4" />
          <label htmlFor="remember" className="text-gray-600 cursor-pointer">
            Quên mật khẩu
          </label>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-2 uppercase font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer"
        >
          ĐĂNG NHẬP
        </button>
      </form>
    </div>
  );
}
