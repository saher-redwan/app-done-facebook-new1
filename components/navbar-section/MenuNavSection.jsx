"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MainLinksMenu from "../basic-items/MainLinksMenu";
import Logo from "./Logo";
import { useState } from "react";

export default function MenuNavSection() {
  const [openSheet, setOpenSheet] = useState(false);

  function toggleOpenSheet() {
    setOpenSheet((prev) => !prev);
  }

  return (
    <div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <button className="lg:hidden p-1" onClick={toggleOpenSheet}>
            <img
              src="/images/basic/menu-btn.svg"
              alt=""
              className="w-[2.15rem] h-[2.15rem]"
            />
          </button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="h-full">
            <Logo forMobileStyle="!text-[#000]" />
            <div className="mt-4 border-s-[1px] p-1.5 ">
              <MainLinksMenu
                forMobileStyle="!static !border-[0] w-full"
                toggleOpenSheet={toggleOpenSheet}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
