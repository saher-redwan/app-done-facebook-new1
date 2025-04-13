// you can use this component as basic-item for uploading image, but you must adhere to the rules for props and other functions (in parent and child component) .

"use client";

// *** ERROR: solve later / after selecting an img then cancel it, it uploads with request the post(without the img)

import {
  // UploadButton,
  UploadDropzone,
} from "@uploadthing/react";
import { useRef, useEffect, useState } from "react";
import LoadingSpinner from "../basic-items/LoadingSpinner";
import Button from "../basic-items/Button";
import DeleteSvg from "../svgs/DeleteSvg";

export default function UploadButtonItem({
  setImgUrl,
  loadingForm,
  setLoadingForm,
  uploadingImg,
  setUploadingImg,
  imgSelected,
  setImgSelected,
  error_img,
  setError_img,
  // to create a new img-selector elemenet
  fatherItem,
}) {
  const itemRef = useRef();

  useEffect(() => {
    const inputFile = itemRef.current.querySelector("input");

    inputFile.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        setError_img("");
        setImgUrl("");

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
      }
    });
  }, []);

  useEffect(() => {
    if (loadingForm) {
      // upload the img, There is only one button responsible for uploading the image.
      itemRef.current.querySelector("button").click();
    }
  }, [loadingForm]);

  useEffect(() => {
    console.log("imgSelected is:::", imgSelected);
  }, [imgSelected]);

  return (
    <>
      <div className="relative">
        <div
          ref={itemRef}
          className={`my-uploadThing-item--`}
          style={{ display: imgSelected ? "block" : "none" }}
        >
          <div
            className={`input-item hide-Upload-Button`}
            // className={`input-item
            //   ${error_img && "disabe-button-when-err"} ${
            //   hideUploadButton && "hide-Upload-Button"
            // }`}
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
                setLoadingForm(false);
                // setHideUploadButton(false);
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
              onDrop={(acceptedFiles) => {
                // Do something with the accepted files
                console.log("Accepted files: ", acceptedFiles);
                // setImgUrl(acceptedFiles[0].url);
                // console.log("XXXX:, ", acceptedFiles[0].url);
                if (acceptedFiles.length == 0) {
                  //  null input
                }
              }}
            />
          </div>

          {/* img section */}
          {imgSelected && !error_img && (
            <div className="relative w-fit">
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

        {/* for custom items (select img, cancel img) */}
        {/* select img */}
        {!imgSelected && (
          <Button
            onClick={() =>
              fatherItem.querySelector(".my-uploadThing-item-- input").click()
            }
            styleOfButton="outline"
            className="border-dotted border-[var(--border-color)] mt-7 mb-4"
            style={{ borderWidth: "3.25px" }}
          >
            choose file
          </Button>
        )}

        {/* cancel button */}
        <div
          onClick={() => {
            setImgSelected("");
            //
            const inputFile = itemRef.current.querySelector("input");
            inputFile.value = null;
          }}
          className="cursor-pointer w-fit -mt-3 mb-[1.7rem]  relative opacity-[0.885] hover:opacity-[1] bg-[var(--background-color-2)] p-2 rounded-[50%] group"
          style={{
            display: imgSelected ? "block" : "none",
            boxShadow: "-1px 2px 4.5px var(--danger-color)",
          }}
        >
          <DeleteSvg className="w-[22px] z-[10] fill-[var(--danger-color)] group-hover:rotate-12 group-hover:skew-x-[8deg] " />
        </div>

        {/* end component */}
      </div>
    </>
  );
}
