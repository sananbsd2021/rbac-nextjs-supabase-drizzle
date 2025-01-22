import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ControlPanalPage from "./Ccontolpanal";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      <h1 className="text-5xl text-bold text-center">ระบบจัดการข้อมูล</h1>
      <ControlPanalPage />
    </div>
  );
}
