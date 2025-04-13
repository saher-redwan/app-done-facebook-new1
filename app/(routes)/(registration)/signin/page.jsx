"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();
  const [isRenderThePage, setIsRenderThePage] = useState(false);

  useEffect(() => {
    // not allow this page when loggedin.
    setIsRenderThePage(true);
    if (session?.user?.email) {
      window.location = "/";
    }
  }, [session?.user?.email]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function signInWithCredentials(e) {
    e.preventDefault();

    await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      // redirect to prev page that user need.
      callbackUrl,
    });
  }

  async function signInWithGoogle() {
    await signIn("google", {
      callbackUrl,
    });
  }

  return (
    <>
      {isRenderThePage && !session?.user?.email ? (
        <>
          <form onSubmit={signInWithCredentials}>
            <label className="basic-input flex gap-4">
              Email
              <input name="email" type="email" required ref={emailRef} />
            </label>
            <label className="basic-input flex gap-4">
              Password
              <input
                name="password"
                type="password"
                required
                ref={passwordRef}
              />
            </label>
            <button className="basic-input mt-2" type="submit">Sign In</button>
            <hr className="mt-3" />
            <hr />
            <hr />
          </form>
          <div>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="bg-slate-400 p-2 m-4"
            >
              SignIn with Google
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
