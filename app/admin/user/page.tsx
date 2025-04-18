import React from "react";
import axios from "axios";
import { UserWithAddress } from "@/lib/types/user";
import { UserList } from "@/components/users-management/users-list";
import { adminUserColumns } from "@/components/users-management/column";

async function getUsers(): Promise<UserWithAddress[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/users?_embed=addresses`
    );
    const usersData: UserWithAddress[] = res.data.map(
      (user: UserWithAddress) => ({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
        addresses: user.addresses,
      })
    );
    return usersData;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export default async function UserPage() {
  const initialUsers = await getUsers();
  return (
    <div className="p-6 md:p-8 lg:p-10 space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Wine Hourse - Quản lý người dùng
        </h1>
      </div>

      <div className="w-full lg:flex-1">
        <UserList initialUsers={initialUsers} columns={adminUserColumns} />
      </div>
    </div>
  );
}
