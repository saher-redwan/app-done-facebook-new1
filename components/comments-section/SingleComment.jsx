"use client";

import { useEffect, useRef, useState } from "react";
import EditComment from "./EditComment";
import Link from "../basic-items/Link";
import { useGlobalContext } from "@/context/store";
import { motion } from "framer-motion";
import { zeroingTheLength } from "@/lib/utils";
import CommentPopover from "./CommentPopover";
import DeleteComment from "./DeleteComment";

export default function SingleComment({
  comment,
  _id_post,
  setCountOfComments,
  setComments,
  // toggledModal,
}) {
  const { user } = useGlobalContext();
  const [text, setText] = useState(comment?.commentText);
  const [isEdited, setIsEdited] = useState(comment?.isEdited);

  // const [isDeletedComment, setIsdeletedComment] = useState(false);

  const commentItem = useRef();

  // const valueOfAnimaiton = {
  //   initial: {
  //     // scale: "0.925",
  //     height: "0px",
  //     // skewY: "5deg",
  //     // marginTop: "30px",
  //   },
  //   animate: {
  //     // scale: "1",
  //     height: `${commentItem?.current?.offsetHeight}px`,
  //     // skewY: `0deg`,
  //     // marginTop: `0`,
  //   },
  // };
  const valueOfAnimaiton = () =>
    comment?.addAnimation
      ? {
          initial: {
            // scale: "0.925",
            height: "0px",
            // skewY: "5deg",
            // marginTop: "30px",
          },
          animate: {
            // scale: "1",
            height: `auto`,
            // skewY: `0deg`,
            // marginTop: `0`,
          },
        }
      : {
          initial: {
            // scale: "0.925",
            // height: "0px",
            // skewY: "5deg",
            // marginTop: "30px",
          },
          animate: {
            // scale: "1",
            // height: `auto`,
            // skewY: `0deg`,
            // marginTop: `0`,
          },
        };

  const [styleForAnimation, setStyle] = useState(valueOfAnimaiton());

  // const [addedAnimationOnCreate, setAddedAnimationOnCreate] = useState(false);

  // useEffect(() => {
  //   // it's important for update the height property
  //   // setText((prev) => prev + "!!!");
  //   // setText((prev) => String(prev).slice(0, -3));
  //   if (!addedAnimationOnCreate) {
  //     setStyle(valueOfAnimaiton);
  //   }
  // });
  // useEffect(() => {
  //   // it's important for update the height property
  //   setStyle(valueOfAnimaiton);

  //   return () => {
  //     setStyle(valueOfAnimaiton);
  //   };
  // }, []);

  const [openCommentSettings, setOpenCommentSettings] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);
  const [openDeleteComment, setOpenDeleteComment] = useState(false);

  return (
    <>
      <motion.div
        className="mb-4 pr-2.5 overflow-hidden"
        initial={styleForAnimation.initial}
        animate={styleForAnimation.animate}
        exit={{ ...zeroingTheLength, scale: 0.975 }}
        transition={{ duration: 1.2, ease: "backInOut" }}
      >
        <div ref={commentItem}>
          <div className="flex justify-between items-start gap-3">
            <div className="flex gap-3">
              <Link
                href={`/profile/${comment.user?._id}`}
                className="flex gap-2 w-fit"
              >
                <div>
                  <img
                    src={comment.user?.image}
                    alt=""
                    className="w-[28.5px] h-[28.5px] rounded-[6px] object-cover"
                  />
                </div>
                <span>{comment.user?.name}</span>
              </Link>
              {/* isEdited part */}
              {isEdited && (
                <div>
                  <span className="text-[0.75rem] text-gray-600">Edited</span>
                </div>
              )}
            </div>
            <div className="flex">
              {/* {user?._id == comment.user._id && (
                <>
                  <DeleteComment
                    _id_post={_id_post}
                    _id_comment={comment._id}
                    setCountOfComments={setCountOfComments}
                    setIsdeletedComment={setIsdeletedComment}
                  />
                  <EditComment
                    setText={setText}
                    setIsEdited={setIsEdited}
                    setComments={setComments}
                    _id_post={_id_post}
                    _id_comment={comment._id}
                    text={text}
                  />
                </>
              )} */}
              {user?._id == comment.user._id && (
                <CommentPopover
                  text={text}
                  setText={setText}
                  setIsEdited={setIsEdited}
                  setComments={setComments}
                  _id_post={_id_post}
                  _id_comment={comment._id}
                  setCountOfComments={setCountOfComments}
                  openCommentSettings={openCommentSettings}
                  setOpenCommentSettings={setOpenCommentSettings}
                  openEditComment={openEditComment}
                  setOpenEditComment={setOpenEditComment}
                  openDeleteComment={openDeleteComment}
                  setOpenDeleteComment={setOpenDeleteComment}
                />
              )}
            </div>
          </div>
          <div className="text-left">
            <p>{text}</p>
          </div>
        </div>
      </motion.div>

      {/* More related components (edit, del) */}
      <EditComment
        text={text}
        setText={setText}
        _id_post={_id_post}
        _id_comment={comment._id}
        setComments={setComments}
        openEditComment={openEditComment}
        setOpenEditComment={setOpenEditComment}
        setIsEdited={setIsEdited}
      />

      <DeleteComment
        _id_post={_id_post}
        _id_comment={comment._id}
        setCountOfComments={setCountOfComments}
        setComments={setComments}
        // setIsdeletedComment={setIsdeletedComment}
        openDeleteComment={openDeleteComment}
        setOpenDeleteComment={setOpenDeleteComment}
      />
    </>
  );
}
