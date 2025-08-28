import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { RegisterForm } from "@/components/register-form";

async function Page() {
  const session = await auth();

  if (!!session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Page;
