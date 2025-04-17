import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/store";
import Button from "../basic-items/Button";
import changeUserData from "@/server-actions/changeUserData";
import { updateNameForPosts } from "@/server-actions/updateDataAfterChangingUserData";
import { useSession } from "next-auth/react";
import UploadButtonItem from "../uploadthing-items/UploadButtonItem";
import fetchData from "../custom-hooks/fetchData";

export default function EditUserInfo({
  loadingStuffForUser,
  openUpdateDateForm,
  userId,
  setOpenUpdateDateForm,
}) {
  // for image upload.
  const [imgUrl, setImgUrl] = useState("");
  const [uploadingImg, setUploadingImg] = useState("not-start");
  const [imgSelected, setImgSelected] = useState("");
  const [error_img, setError_img] = useState();
  // end image upload.
  const [loadingForm, setLoadingForm] = useState(false);

  const { user } = useGlobalContext();
  const route = useRouter();

  const [newName, setNewName] = useState(user?.name);

  useEffect(() => {
    setNewName(user?.name);
  }, [user]);

  const { data: session, update: sessionUpdate } = useSession();

  async function handleChangeData(e) {
    e.preventDefault();

    if (user._id != userId) {
      alert("that is not your ID!. Please, Don't Do that");
      return;
    }

    setLoadingForm(true);

    // here will post without img, otherwise will post with img using useEffect below...
    if (!imgSelected) {
      await updateUserOperation();
    }
  }

  useEffect(() => {
    (async () => {
      if (uploadingImg == "complete" && imgSelected) {
        await updateUserOperation(imgSelected);
      }
    })();
  }, [uploadingImg]);

  useEffect(() => {
    console.log("uploadingImg::::", uploadingImg);
  }, [uploadingImg]);

  // for image upload
  async function updateUserOperation() {
    await changeUserData(userId, { newName, newImg: imgUrl });
    await updateNameForPosts({ newName, newImg: imgUrl });
    await sessionUpdate({
      // ...session,
      user: {
        // ...session.user,
        name: newName,
        // this will put the image property only if it existed
        ...(imgUrl && { image: imgUrl }),
      },
    }).then(() => {
      // here we need this navigation so that refresh the website as a whole (to change the session in the browser)
      window.location = "/";
    });
  }

  // for animations
  const editFormItem = useRef();

  const valueOfAnimaiton = {
    initial: {
      scale: "0.925",
      height: "0px",
      skewX: "18deg",
      // display: "none",
      // marginTop: `0`,
      // display: "none",
    },
    animate: {
      scale: "1",
      height: `${editFormItem?.current?.offsetHeight + 2}px`,
      skewX: `0deg`,
      // display: "flex",
      // marginTop: "0px",
      // display: "block",
    },
  };

  const [styleForAnimation, setStyle] = useState(valueOfAnimaiton);

  useEffect(() => {
    setStyle(valueOfAnimaiton);
  }, [loadingStuffForUser, openUpdateDateForm, imgSelected]);

  useEffect(() => {
    // for reset height of form ele (for animations)
    setOpenUpdateDateForm((prev) => !prev);
    setTimeout(() => {
      setOpenUpdateDateForm((prev) => !prev);
    }, 1);
  }, [imgSelected, imgUrl]);

  const fatherItem = useRef();
  // end animaitons

  return (
    <div ref={fatherItem} style={{ transitionDuration: "0.5s" }}>
      <motion.div
        initial={styleForAnimation?.initial}
        animate={
          openUpdateDateForm
            ? styleForAnimation?.animate
            : styleForAnimation?.initial
        }
        onAnimationStart={() => {
          openUpdateDateForm
            ? (fatherItem.current.style.marginTop = "0")
            : (fatherItem.current.style.marginTop = "-12px");
        }}
        transition={{ duration: 1.2, ease: "backInOut" }}
        className="overflow-hidden"
      >
        <form
          ref={editFormItem}
          onSubmit={handleChangeData}
          className="flex flex-col gap-1 mb-5 p-3"
          style={{
            borderBottom: "2px solid var(--border-light-color)",
            borderRadius: "8px",
          }}
        >
          <div className={`${loadingForm ? "disabled-all" : ""}`}>
            <label className="flex gap-1 flex-col">
              <span>Enter Name:</span>
              <input
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                className="basic-input"
                type="text"
                placeholder="New Name"
              />
            </label>

            <div className="mt-4">
              <div className="flex flex-col">
                <span className="-mb-1.5">change image:</span>
                <div>
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
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <Button
              styleOfButton="outline"
              onClick={() => route.push("/")}
              className="bg-transparent border border-[1px] border-[var(--border-light-color)] text-[var(--text-color)]"
            >
              Back Home
            </Button>
            <Button
              onClick={handleChangeData}
              styleOfButton="success"
              loading={loadingForm}
              disabled={!imgSelected && !newName}
            >
              Update User Data
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
