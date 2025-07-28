import { useEffect } from "react";
import { useRouter } from "next/router";
import SplashLoader from "@/components/SplashLoader";

export default function SplashPage() {
  const router = useRouter();

  const handleFinish = () => {
    document.cookie = "splash-loaded=true; path=/; max-age=31536000";
    router.replace("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFinish();
    }, 3000); // or however long your animation runs

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashLoader onFinish={handleFinish} />;
}