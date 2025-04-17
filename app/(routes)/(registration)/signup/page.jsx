"use client";

import Button from "@/components/basic-items/Button";
import "../style.css";
import fetchData from "@/components/custom-hooks/fetchData";
import UploadButtonItem from "@/components/uploadthing-items/UploadButtonItem";
import { useGlobalContext } from "@/context/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const UserForm = () => {
  const { user } = useGlobalContext();

  const [isRenderThePage, setIsRenderThePage] = useState(false);

  useEffect(() => {
    // not allow this page when loggedin.
    setIsRenderThePage(true);
    if (user?.email) {
      window.location = "/";
    }
  }, [user?.email]);

  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // for imgae.

  const [imgUrl, setImgUrl] = useState("");

  const [uploadingImg, setUploadingImg] = useState("not-start");

  const [imgSelected, setImgSelected] = useState("");

  const [error_img, setError_img] = useState();

  const [loadingForm, setLoadingForm] = useState(false);

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function signUpOperation() {
    const sentObject = {
      formData: {
        ...formData,
        ...(imgUrl && { image: imgUrl }),
        SignUp_provider: "Credentials",
      },
    };

    console.log(sentObject);

    // return null;

    const { data: data_fetch } = await fetchData(
      "POST",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup`,
      sentObject
    );
    // // console.log("data_fetch:::", data_fetch);

    if (!data_fetch) {
      // const response = await res.json();
      setLoadingForm(false);
      setErrorMessage("something wrong!");
    } else {
      // router.refresh();
      router.push("/signin");
    }
  }

  const signUpWithCredentials = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoadingForm(true);

    // without img
    if (!imgSelected) {
      await signUpOperation();
    }
  };

  useEffect(() => {
    // post if there is img
    if (imgSelected && uploadingImg == "complete" && !error_img) {
      signUpOperation();
    }
  }, [uploadingImg]);

  useEffect(() => {
    console.log(("uploadingImg::: ", uploadingImg));
  }, [uploadingImg]);

  // for google registration.

  async function signUpWithGoogle() {
    // i check inside authrize auth, if user already signedUp it will convert to signIn function.
    // await signIn("google", {
    //   callbackUrl,
    // });
    await signIn("google");
  }

  const fatherItem = useRef();

  return (
    <>
      {isRenderThePage && !user?.email ? (
        <div className="signup-page--">
          <div className="login-container">
            <h2>sign up</h2>
            <form onSubmit={signUpWithCredentials} method="post" className="">
              {/* <h1 className="font-bold text-3xl">SignUp</h1> */}
              {/* <label>Full Name</label> */}
              <div class="input-group">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChangeInput}
                  required={true}
                  value={formData.name}
                  className="basic-input"
                />
                <label>Name</label>
              </div>

              <div class="input-group">
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleChangeInput}
                  required={true}
                  value={formData.email}
                  className="basic-input"
                />
                <label>Email</label>
              </div>
              {/* <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChangeInput}
              required={true}
              value={formData.email}
              className="basic-input"
            /> */}

              {/* <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChangeInput}
              required={true}
              value={formData.password}
              className="basic-input"
            /> */}
              <div class="input-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChangeInput}
                  required={true}
                  value={formData.password}
                  className="basic-input"
                />
                <label>Password</label>
              </div>

              <div ref={fatherItem}>
                <UploadButtonItem
                  setImgUrl={setImgUrl}
                  loadingForm={loadingForm}
                  setLoadingForm={setLoadingForm}
                  uploadingImg={uploadingImg}
                  setUploadingImg={setUploadingImg}
                  imgSelected={imgSelected}
                  setImgSelected={setImgSelected}
                  error_img={error_img}
                  setError_img={setError_img}
                  fatherItem={fatherItem.current}
                />
              </div>

              {/* <input
              type="submit"
              value="Create User"
              className="bg-blue-300 hover:bg-blue-100"
            /> */}
              {/* <button type="submit" class="login-btn font-[600] text-[#fff]">
                Sign Up
              </button> */}

              {errorMessage && (
                <p className="danger mb-3 animate-[scale-appear_1s_ease-in-out]">
                  {errorMessage}
                </p>
              )}

              <Button type="submit" loading={loadingForm}>
                Sign Up
              </Button>

              {/* <span>{loadingForm && "loading..."}</span> */}
            </form>

            <div class="or-divider">OR</div>
            <button onClick={signUpWithGoogle} type="button" class="google-btn">
              SignUp with
              <img src="https://www.google.com/favicon.ico" alt="Google Icon" />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserForm;
