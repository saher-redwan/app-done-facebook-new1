"use client";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

// import DeletePostBtn from "./DeletePostBtn";
import React, { useEffect, useState } from "react";
import Button from "../basic-items/Button";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import DotsSvg from "../svgs/DotsSvg";

export default function CommentPopover({
  text,
  setText,
  setIsEdited,
  setComments,
  _id_post,
  _id_comment,
  setCountOfComments,
  openCommentSettings,
  setOpenCommentSettings,
  openEditComment,
  setOpenEditComment,
  openDeleteComment,
  setOpenDeleteComment,
}) {
  // const [openPopover, setOpenPopover] = useState(false);

  // const [
  //   // openEditCommentModal,
  //   setOpenEditCommentModal,
  // ] = useState(false);

  // function toggleEditComment() {
  //   setOpenEditCommentModal((prev) => !prev);
  // }

  return (
    <div>
      <Popover
        defaultOpen={true}
        open={openCommentSettings}
        onOpenChange={setOpenCommentSettings}
      >
        <PopoverTrigger>
          <div>
            <DotsSvg className="w-[1.7rem] h-[1.65rem]" />
            {/* <img
              src="/images/basic/dots.svg"
              alt=""
              className="w-[1.7rem] h-[1.65rem] object-cover"
            /> */}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-1 flex-col *:p-2 *:cursor-pointer hover:*:bg-[var(--so-light-color)]">
            {/* <DeleteComment
              _id_post={_id_post}
              _id_comment={comment._id}
              setCountOfComments={setCountOfComments}
              setIsdeletedComment={setIsdeletedComment}
            /> */}
            <div>
              <div onClick={() => setOpenDeleteComment(true)}>delete comm</div>
              {/* <DeleteComment
                _id_post={_id_post}
                _id_comment={_id_comment}
                setCountOfComments={setCountOfComments}
                setComments={setComments}
                // setIsdeletedComment={setIsdeletedComment}
              /> */}
            </div>
            <div>
              {/* <div onClick={toggleEditComment}>
                <img
                  src="images/basic/edit-pencil.svg"
                  alt=""
                  className="w-[1.5rem] h-[1.5rem]"
                />
                <span>Edit</span>
              </div> */}
              <div onClick={() => setOpenEditComment((prev) => !prev)}>
                edit comment ✔
              </div>
              {/* <EditComment
                openEditCommentModal={openEditCommentModal}
                setOpenEditCommentModal={setOpenEditCommentModal}
                text={text}
                setText={setText}
                setIsEdited={setIsEdited}
                setComments={setComments}
                _id_post={_id_post}
                _id_comment={_id_comment}
              /> */}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
