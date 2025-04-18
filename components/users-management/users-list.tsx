"use client"; // <<< Đánh dấu đây là Client Component

import React, { useState, useMemo } from "react";
import { translateRoleToVN } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { RoleEN } from "@/lib/constants";
import { UserWithAddress } from "@/lib/types/user";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserDataTable } from "@/components/users-management/users-data-table";

interface UserListProps {
  initialUsers: UserWithAddress[];
  columns: ColumnDef<UserWithAddress>[];
}

const filterableRoles: (RoleEN | null)[] = [null, "user", "admin"];

export function UserList({ initialUsers, columns }: UserListProps) {
  const [selectedRole, setSelectedRole] = useState<RoleEN | null>(null);
  const router = useRouter();

  const roleCounts = useMemo(() => {
    const counts = filterableRoles.reduce<Record<string, number>>(
      (acc, roleKey) => {
        if (roleKey !== null) {
          acc[translateRoleToVN(roleKey)] = initialUsers.filter(
            (user) => user.role === roleKey
          ).length;
        }
        return acc;
      },
      { "Tất cả": initialUsers.length }
    );
    return counts;
  }, [initialUsers]);

  const displayedUsers = useMemo(() => {
    if (selectedRole === null) {
      return initialUsers;
    }
    return initialUsers.filter((user) => user.role === selectedRole);
  }, [initialUsers, selectedRole]);

  const handleFilterClick = (role: RoleEN | null) => {
    setSelectedRole(role);
  };

  const getFilterButtonText = (roleKey: RoleEN | null): string => {
    if (roleKey === null) {
      return `Tất cả (${roleCounts["Tất cả"] ?? 0})`;
    }
    const translated = translateRoleToVN(roleKey);
    console.log(roleCounts);
    return `${translated} (${roleCounts[translated] ?? 0})`;
  };

  const handleRefresh = () => {
    router.refresh();
    toast.success("Đã làm mới danh sách người dùng!");
  };

  return (
    <div className="space-y-4 bg-gray-50 border border-gray-300 rounded p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl">DANH SÁCH NGƯỜI DÙNG</h2>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> {/* Optional icon */}
          Làm mới
        </Button>
      </div>

      <div className="text-xs text-gray-600 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-medium mr-1">Vai trò:</span>
        {filterableRoles.map((roleKey, index) => (
          <React.Fragment key={roleKey ?? "all"}>
            {index > 0 && <span className="text-gray-300">|</span>}{" "}
            <button
              onClick={() => handleFilterClick(roleKey)}
              className={clsx(
                "hover:underline hover:text-yellow-500 whitespace-nowrap focus:outline-none",
                {
                  "font-bold text-yellow-600": selectedRole === roleKey,
                }
              )}
            >
              {getFilterButtonText(roleKey)}
            </button>
          </React.Fragment>
        ))}
      </div>

      <UserDataTable columns={columns} data={displayedUsers} />
    </div>
  );
}
