"use client";
import { useRouter } from "next/navigation";
const Mainpage = () => {
  const router = useRouter();

  return router.push("/dashboard");
};

export default Mainpage;
