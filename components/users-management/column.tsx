"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { UserWithAddress } from "@/lib/types/user";
import { formatDisplayDate, translateRoleToVN } from "@/lib/utils";
import AdminUserDetails from "@/components/users-management/user-detail";

export const adminUserColumns: ColumnDef<UserWithAddress>[] = [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 w-full ${
            isSorted ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EMAIL
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
    size: 200,
    minSize: 150,
    maxSize: 250,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 w-full ${
            isSorted ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TÊN TÀI KHOẢN
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
    size: 150,
    minSize: 100,
    maxSize: 200,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 w-full ${
            isSorted ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          HỌ TÊN
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
    size: 150,
    minSize: 100,
    maxSize: 200,
  },
  {
    accessorKey: "role",
    header: "VAI TRÒ",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const translateRole = translateRoleToVN(role);
      let roleClasses =
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium";
      switch (role.toLowerCase()) {
        case "admin":
          roleClasses +=
            " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
          break;
        case "user":
          roleClasses +=
            " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
          break;
        default:
          roleClasses +=
            " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
          break;
      }
      return <span className={roleClasses}>{translateRole}</span>;
    },
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 w-full ${
            isSorted ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NGÀY TẠO
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {formatDisplayDate(row.getValue("created_at"))}
      </div>
    ),
    size: 120,
    minSize: 100,
    maxSize: 150,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className={`cursor-pointer hover:bg-gray-200 w-full ${
            isSorted ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NGÀY CẬP NHẬT
          {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {formatDisplayDate(row.getValue("updated_at"))}
      </div>
    ),
    size: 120,
    minSize: 100,
    maxSize: 150,
  },
  {
    id: "actions",
    header: () => <div className="text-center">HÀNH ĐỘNG</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="text-center">
          <AdminUserDetails userId={user.id} />
        </div>
      );
    },
    size: 120,
    minSize: 100,
    maxSize: 150,
  },
];
