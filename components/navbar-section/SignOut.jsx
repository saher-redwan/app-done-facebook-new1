"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      type="button"
      onClick={() => {
        // signOut({ redirectTo: "/" });
        signOut({ redirectTo: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/` });
      }}
    >
      SignOut
    </button>
  );
}
