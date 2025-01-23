"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function SessionListener() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
          router.push("/sign-in");
        } else {
          const currentUrl = window.location.pathname;
          if (currentUrl.includes("/sign-in")) {
            router.push("/protected");
          }
        }
      });

      return () => {
        data.subscription.unsubscribe()
      };
    }
  }, [router, supabase]);

  return null;
}

export default SessionListener;
