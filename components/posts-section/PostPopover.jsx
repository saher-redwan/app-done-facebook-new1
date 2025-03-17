"use client";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
// import DeletePostBtn from "./DeletePostAlert";
import { useState } from "react";
import Link from "../basic-items/Link";
import DotsSvg from "../svgs/DotsSvg";
import DeleteSvg from "../svgs/DeleteSvg";
import EditSvg from "../svgs/EditSvg";

export default function PostPopover({
  id,
  setPosts,
  postRef,
  // setIsDeleteItem,
  openPostOptions,
  setOpenPostOptions,
  setOpenDeleteAlert,
}) {
  // const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={openPostOptions} onOpenChange={setOpenPostOptions}>
        <PopoverTrigger>
          <div>
            {/* <img
              src="/images/basic/dots.svg"
              alt=""
              className="w-[1.7rem] h-[1.65rem] object-cover"
            /> */}
            <DotsSvg width="1.7rem" height="1.65rem" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-1 flex-col *:p-2 *:cursor-pointer hover:*:bg-[var(--so-light-color)]">
            <button
              onClick={() => {
                setOpenPostOptions(false);
                setOpenDeleteAlert(true);
              }}
            >
              <div className="flex items-center gap-0.5">
                <div className="flex gap-2.5 w-full items-center">
                  <DeleteSvg
                    className="need-invert"
                    width="22px"
                    height="22px"
                  />
                  <span className="">delete post</span>
                </div>
              </div>
            </button>

            {/* <DeletePostBtn
              id={id}
              setPosts={setPosts}
              // postRef={postRef}
              setOpen={setOpen}
              // setIsDeleteItem={setIsDeleteItem}
            /> */}
            <Link
              href={`/editTask/${id}`}
              className="flex gap-2.5 items-center"
            >
              <EditSvg className="need-invert" width="22px" height="22px" />
              <span className="">Edit</span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
