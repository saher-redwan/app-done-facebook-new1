"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      type="button"
      onClick={() => {
        signOut({ redirectTo: "/" });
      }}
    >
      SignOut
    </button>
  );
}
