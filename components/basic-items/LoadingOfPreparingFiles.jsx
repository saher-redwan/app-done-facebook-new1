"use client";

import { useGlobalContext } from "@/context/store";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useRef } from "react";

export default function LoadingOfPreparingFiles() {
  const { loadingOfPreparingFiles } = useGlobalContext();

  const ref = useRef();
  useEffect(() => {
    document.body.appendChild(ref.current);
  }, []);

  return (
    <>
      <div
        className="fixed top-[4rem] left-[50vw] -translate-x-1/2 backdrop-blur-[1.5px] bg-[#ffffff7c] p-[0.65rem] rounded-[50%] shadow-[0_0_25px_#00000042] select-none"
        style={{
          marginTop: loadingOfPreparingFiles ? "0px" : "-50px",
          opacity: loadingOfPreparingFiles ? "1" : "0",
          zIndex: loadingOfPreparingFiles ? "10000000000" : "-100",
          //
          transitionDuration: "0.45s",
        }}
      >
        <LoadingSpinner />
      </div>
      {/*  */}
      <div
        ref={ref}
        className={`${loadingOfPreparingFiles ? "disable-click-overlay" : ""}`}
      ></div>
    </>
  );
}
