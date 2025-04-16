"use client";

import "../style.css";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/basic-items/Button";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function signInWithCredentials(e) {
    e.preventDefault();

    setLoading(true);

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

  useEffect(() => {
    if (searchParams.get("error") === "CredentialsSignin") {
      setErrorMessage("somthing went wrong!");
    }
  }, [searchParams]);

  return (
    <>
      {isRenderThePage && !session?.user?.email ? (
        <>
          <div className="signin-page--">
            <div className="login-container">
              <h2>sign in</h2>
              <form
                onSubmit={signInWithCredentials}
                className={`${loading ? "disabled-all" : ""}`}
              >
                <div class="input-group">
                  <input
                    ref={emailRef}
                    id="name"
                    name="name"
                    type="text"
                    required={true}
                    className="basic-input"
                  />
                  <label>email</label>
                </div>

                <div class="input-group">
                  <input
                    ref={passwordRef}
                    id="name"
                    name="name"
                    type="password"
                    required={true}
                    className="basic-input"
                  />
                  <label>password</label>
                </div>

                <p className="text-red-500 mb-3 font-bold">{errorMessage}</p>

                <Button type="submit" loading={loading}>
                  Sign In
                </Button>
                {/* <button type="submit" class="login-btn font-[600] text-[#fff]">
                  Sign In
                </button> */}

                <div class="or-divider">OR</div>
                <button
                  onClick={signInWithGoogle}
                  type="button"
                  class="google-btn"
                >
                  SignUp with
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google Icon"
                  />
                </button>

                {/* <span>{loadingForm && "loading..."}</span> */}
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
