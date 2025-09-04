import { SignupForm } from "@/app/(pages)/(auth)/signup/signup-form";

function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}

export default Page;
