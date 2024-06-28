"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";
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
    <div className={styles.container}>
      <form className={styles["signin-form"]} onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
