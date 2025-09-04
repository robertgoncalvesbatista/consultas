import { redirect } from "next/navigation";

import { auth } from "@/auth";

type Props = Readonly<{
  children: React.ReactNode;
}>;

async function PagesLayout({ children }: Props) {
  const session = await auth();

  if (!!session) {
    redirect("/dashboard");
  }

  return children;
}

export default PagesLayout;
