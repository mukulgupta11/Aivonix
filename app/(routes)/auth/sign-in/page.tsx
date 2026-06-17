import React from "react";
import Logo from "@/components/logo";
import SignInForm from "../_common/signin-form";

const Page = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="relative flex w-full max-w-md flex-col gap-6">
        <div className="flex w-full items-center justify-center">
          <Logo surface="light" />
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default Page;
