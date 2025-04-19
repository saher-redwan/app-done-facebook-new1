"use client";

import styles from "./style.module.css";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

// import DeletePostBtn from "./DeletePostBtn";
import React, { useEffect, useState } from "react";
import Button from "../basic-items/Button";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import DotsSvg from "../svgs/DotsSvg";
import EditSvg from "../svgs/EditSvg";
import DeleteSvg from "../svgs/DeleteSvg";

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
            <div className={styles.delete_svg_container}>
              <div
                onClick={() => setOpenDeleteComment(true)}
                className={`flex items-center gap-1.5`}
              >
                <DeleteSvg className="need-invert w-[22px]" />
                <span>delete comm</span>
              </div>
              {/* <DeleteComment
                _id_post={_id_post}
                _id_comment={_id_comment}
                setCountOfComments={setCountOfComments}
                setComments={setComments}
                // setIsdeletedComment={setIsdeletedComment}
              /> */}
            </div>
            <div className={styles.edit_svg_container}>
              {/* <div onClick={toggleEditComment}>
                <img
                  src="images/basic/edit-pencil.svg"
                  alt=""
                  className="w-[1.5rem] h-[1.5rem]"
                />
                <span>Edit</span>
              </div> */}
              <div
                onClick={() => setOpenEditComment((prev) => !prev)}
                className={`flex items-center gap-1.5`}

                // className="flex items-center gap-1.5 hover:[&_svg]:filter-none hover:[&_svg]:*:stroke-[red] hover:[&_svg_path]:stroke-red-500"
                // className="flex items-center gap-1.5 group"
              >
                <EditSvg className="need-invert w-[22px]" />
                <span>edit comment</span>
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
