"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    if (!result.error) {
      router.push("/dashboard");
      console.log("Successfully signed in!");
    } else {
      console.error("Sign in failed:", result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="email" name="email" placeholder="Email" required />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
