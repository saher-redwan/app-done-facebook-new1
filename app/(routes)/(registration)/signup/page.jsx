"use client";

import fetchData from "@/components/custom-hooks/fetchData";
import UploadButtonItem from "@/components/uploadthing-items/UploadButtonItem";
import { useGlobalContext } from "@/context/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [loadingPosting, setLoadingPosting] = useState(false);

  function changeImgUrl(newVal) {
    setImgUrl(newVal);
  }
  function changeLoadingPosting(newVal) {
    setLoadingPosting(newVal);
  }

  const [uploadingImg, setUploadingImg] = useState("not-start");

  const [imgSelected, setImgSelected] = useState("");

  const [error_img, setError_img] = useState();

  function changeUploadingImg(newVal) {
    setUploadingImg(newVal);
  }
  function changeImgSelected(newVal) {
    setImgSelected(newVal);
  }
  function changeError_img(newVal) {
    setError_img(newVal);
  }

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
        image: imgUrl,
        SignUp_provider: "Credentials",
      },
    };

    const { data: data_fetch } = await fetchData(
      "POST",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup`,
      sentObject
    );
    // // console.log("data_fetch:::", data_fetch);

    if (!data_fetch) {
      // const response = await res.json();
      setErrorMessage("something wrong!");
    } else {
      router.refresh();
      router.push("/signin");
    }
  }

  const signUpWithCredentials = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoadingPosting(true);
  };

  useEffect(() => {
    // post if there is img
    if (imgSelected && uploadingImg == "complete" && !error_img) {
      signUpOperation();
    }
  }, [uploadingImg]);

  // for google registration.

  async function signUpWithGoogle() {
    // i check inside authrize auth, if user already signedUp it will convert to signIn function.
    // await signIn("google", {
    //   callbackUrl,
    // });
    await signIn("google");
  }

  return (
    <>
      {isRenderThePage && !user?.email ? (
        <>
          <form
            onSubmit={signUpWithCredentials}
            method="post"
            className="flex flex-col gap-3 w-1/2 items-center justify-center mt-8"
          >
            <h1 className="font-bold text-3xl">SignUp</h1>
            <label>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChangeInput}
              required={true}
              value={formData.name}
              className="m-2 bg-slate-400 rounded"
            />
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChangeInput}
              required={true}
              value={formData.email}
              className="m-2 bg-slate-400 rounded"
            />
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChangeInput}
              required={true}
              value={formData.password}
              className="m-2 bg-slate-400 rounded"
            />

            <div>
              <UploadButtonItem
                setImgUrl={changeImgUrl}
                loadingPosting={loadingPosting}
                setUploadingImg={changeUploadingImg}
                uploadingImg={uploadingImg}
                imgSelected={imgSelected}
                setImgSelected={changeImgSelected}
                error_img={error_img}
                setError_img={changeError_img}
                setLoadingPosting={changeLoadingPosting}
              />
            </div>

            <input
              type="submit"
              value="Create User"
              className="bg-blue-300 hover:bg-blue-100"
            />
            <span>{loadingPosting && "loading..."}</span>
          </form>
          <p className="text-red-500">{errorMessage}</p>
          <hr />
          <button
            type="button"
            onClick={signUpWithGoogle}
            className="bg-slate-400 p-2 m-4"
          >
            SignIn with Google
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserForm;
