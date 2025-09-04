import { auth } from "@/auth";

import { ProfileForm } from "./profile-form";

export default async function Page() {
  const session = await auth();

  return <ProfileForm session={session} />;
}
