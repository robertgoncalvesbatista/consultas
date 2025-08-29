import { redirect } from "next/navigation";

import { auth } from "@/auth";

export async function useSession() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return { session };
}
