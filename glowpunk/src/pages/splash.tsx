import { useEffect } from "react";
import { useRouter } from "next/router";
import SplashLoader from "@/components/SplashLoader";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.cookie = "splash-loaded=true; path=/; max-age=31536000";
      router.replace("/");
    }, 3000); // or however long your animation runs

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashLoader />;
}