"use client";

import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";

export default function LoadingEquipment() {
  const { isloadedSession } = useGlobalContext();

  useEffect(() => {
    if (!isloadedSession) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isloadedSession]);

  return (
    <>
      {/* {!isloadedSession && (
        <div>
          <div className="z-[100] fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[6.5px] bg-[#ffffff20] flex justify-center items-center">
            <div className="relative flex justify-center items-center">
              <div className="absolute -left-2 -top-1 animate-ping w-[1rem] h-[1rem] bg-slate-700 rounded-full "></div>
              <span className="text-3xl">LOGO</span>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
