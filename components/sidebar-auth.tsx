import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import Sidebar from "./sidebar";

export default async function AuthSidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <>
      {/* <div className="flex items-center gap-4 absolute right-8 top-12 ">
        Hey, {user.email}!
        <form action={signOutAction}>
          <Button className="text-[#303030]" type="submit" variant={"outline"}>
            Sign out
          </Button>
        </form>
      </div> */}
      <Sidebar />    
    </>
  ) : (
    <div className=""></div>
    // <div className="flex gap-2">
    //   <Button asChild size="sm" variant={"outline"}>
    //     <Link href="/sign-in">Sign in</Link>
    //   </Button>
    //   <Button asChild size="sm" variant={"default"}>
    //     <Link href="/sign-up">Sign up</Link>
    //   </Button>
    // </div>
  );
}