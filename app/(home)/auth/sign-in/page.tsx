import PageBreadCrumb from "@/components/layout/page_bread_crumb";
import SignInMain from "@/components/signin-signup/signin-main";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="container mx-auto max-w-[1200px] mt-6 mb-20 md:mb-40 space-y-8 px-4 ">
      <PageBreadCrumb />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="flex flex-col w-full justify-start">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
            ĐĂNG NHẬP
          </h2>
          <Image
            src={"/images/titleleft-dark.png"}
            alt="title underline"
            width={200}
            height={100}
            className="w-[70px] mt-2 mb-4"
          />
        </div>

        <Link
          href="/auth/sign-up"
          className="bg-black text-white px-6 py-3 uppercase font-medium text-base text-center hover:bg-gray-800 transition-colors w-1/7"
        >
          ĐĂNG KÝ
        </Link>
      </div>
      <div className="w-full">
        <SignInMain />
      </div>
    </main>
  );
}
