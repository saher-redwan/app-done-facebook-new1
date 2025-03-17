// you can use this component as basic-item for uploading image, but you must adhere to the rules for props and other functions (in parent and child component) .

"use client";

import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useRef, useEffect, useState } from "react";
import LoadingSpinner from "../basic-items/LoadingSpinner";

export default function UploadButtonItem({
  setImgUrl,
  loadingSubmit,
  setLoadingSubmit,
  uploadingImg,
  setUploadingImg,
  imgSelected,
  setImgSelected,
  error_img,
  setError_img,
}) {
  const itemRef = useRef();

  // console.log("err,,,", error_img);

  const [hideUploadButton, setHideUploadButton] = useState(false);

  const [hideImgSelected, setHideImgSelected] = useState(true);

  useEffect(() => {
    const inputFile = itemRef.current.querySelector("input");

    inputFile.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        setError_img("");
        setImgUrl("");
        setHideUploadButton(true);
        setHideImgSelected(false);
        // console.log("img url", e.target.files[0]);

        // this for put the selected image in the ui
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgSelected(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImgSelected("");
        setError_img(false);
        setHideImgSelected(true);
        setHideUploadButton(false);
      }
    });
  }, []);

  function openSelectFilesList() {
    itemRef.current.querySelector("input").click();
  }

  useEffect(() => {
    if (loadingSubmit) {
      // upload the img
      itemRef.current.querySelector("button").click();
    }
  }, [loadingSubmit]);

  useEffect(() => {
    if (uploadingImg == "complete" && loadingSubmit) {
      setTimeout(() => {
        setHideUploadButton(false);
      }, 1500);
    }
  }, [uploadingImg]);

  return (
    <>
      <div ref={itemRef} className={`my-uploadThing-item--`}>
        <div
          className={`input-item ${error_img && "disabe-button-when-err"} ${
            hideUploadButton && "hide-Upload-Button"
          }`}
        >
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImgUrl(res[0].url);
              setUploadingImg("complete");
            }}
            onUploadError={(error) => {
              // Do something with the error.
              setError_img(error.message);
              setImgUrl("");
              setUploadingImg("not-start");
              setLoadingSubmit(false);
              setHideUploadButton(false);
            }}
            onBeforeUploadBegin={() => {
              // console.log("befor-Begin");
              setUploadingImg("starting");
            }}
            onUploadBegin={() => {
              // console.log("Begin");
              setError_img("");
              // setLoading(true);
              setUploadingImg("starting");
            }}
          />
          {error_img && (
            <button
              type="button"
              className="select-new-file"
              onClick={openSelectFilesList}
            >
              select-new-file
            </button>
          )}
        </div>
        {/* img section */}
        {imgSelected && !error_img && !hideImgSelected && (
          <div className="relative w-fit" onClick={openSelectFilesList}>
            <img
              src={imgSelected}
              className="w-[150px] h-[120px] bg-[#dddddd] object-contain rounded-[7px]"
            />
            <span className="absolute top-[-2px] left-[-2px] w-[24px] h-[24px] rounded-[50%] bg-[#4caf50] flex items-center justify-center animate-bounce">
              ✔
            </span>
            {uploadingImg == "starting" && (
              <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center backdrop-blur-[5px] p-[0.35rem] rounded-[7px] bg-[#ffffff4a]">
                <LoadingSpinner size={{ w: "33", h: "33" }} />
              </span>
            )}
          </div>
        )}

        {/* error */}
        {error_img && JSON.stringify(error_img)}
      </div>
    </>
  );
}
