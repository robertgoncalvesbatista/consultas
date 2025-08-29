import { redirect } from "next/navigation";

import { SigninForm } from "@/app/(auth)/signin/signin-form";
import { auth } from "@/auth";

async function Page() {
  const session = await auth();

  if (!!session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <SigninForm />
      </div>
    </div>
  );
}

export default Page;
