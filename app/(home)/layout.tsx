import HomeHeader from "@/components/layout/home-header";
import HomeFooter from "@/components/layout/home-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drink House",
  description: "Best Wine and Beer Store since 1899",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter/>
    </>
  );
}
