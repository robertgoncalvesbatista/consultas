import { SigninForm } from "@/app/(pages)/(auth)/signin/signin-form";

function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <SigninForm />
      </div>
    </div>
  );
}

export default Page;
