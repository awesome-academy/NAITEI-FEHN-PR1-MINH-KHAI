import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaWineBottle } from "react-icons/fa";
import { headers } from "next/headers";
import { ROUTES } from "@/lib/constants";
export default async function PageBreadCrumb() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname?.split("/").map((path, index) => {
          const href = `/${path}`;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>
                  {ROUTES.find((route) => route.href === href)?.label ||
                    path.charAt(0).toUpperCase() + path.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathname.split("/").length - 1 && (
                <BreadcrumbSeparator children={<FaWineBottle />} />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
