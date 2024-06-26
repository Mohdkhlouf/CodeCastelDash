// utils/withAuth.js
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signin"); // Redirect to signin page if not authenticated
      }
    }, [status, router]);

    if (status === "loading") {
      return <p>Loading...</p>; // Optional: Show a loading indicator
    }

    return <WrappedComponent {...props} session={session} />; // Pass session prop to wrapped component
  };

  return Wrapper;
};

export default withAuth;
