"use client";

import React, { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function LoadingProcess() {
  useEffect(() => {
    document.body.classList.add("overflow-hidden-important");
    return () => {
      document.body.classList.remove("overflow-hidden-important");
    };
  }, []);

  return (
    <div className="fixed w-[100vw] h-[100vh] left-0 top-0 bg-[#00000017] z-50 flex justify-center items-center">
      <div className="bg-[#ffffff73] rounded-lg p-2.5">
        <LoadingSpinner />
      </div>
    </div>
  );
}
