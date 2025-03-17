"use client";

import { useEffect, useRef, useState } from "react";
// import Modal from "../basic-items/Modal";
import fetchData from "../custom-hooks/fetchData";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditComment({
  text,
  _id_post,
  _id_comment,
  setText,
  setIsEdited,
  setComments,
  openEditComment,
  setOpenEditComment,
}) {
  const editInputElement = useRef();

  const [currentTextInput, setCurrentTextInput] = useState(text);

  // useEffect(() => {
  //   if (openEditCommentModal) {
  //     setTimeout(() => {
  //       editInputElement?.current?.select();
  //     }, 500);
  //   }
  //   if (!openEditCommentModal) {
  //     setCurrentTextInput(text);
  //   }
  // }, [openEditCommentModal]);

  const [loading, setLoading] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();
    console.log("grate Job");
    setLoading(true);

    // const { data } = await fetchData(
    //   "POST",
    //   "${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/fakePostApi",
    //   {
    //     fake: "asdas",
    //   }
    // );

    // setLoading(false);

    // console.log("data is:", data);

    // const { data } = await fetchData(
    //   "PUT",
    //   "${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/edit-comment",
    //   {
    //     _id_post,
    //     _id_comment,
    //     updatedText: currentTextInput,
    //     updatedAt: new Date().toJSON(),
    //   }
    // );

    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/edit-comment", {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id_post,
          _id_comment,
          updatedText: currentTextInput,
          updatedAt: new Date().toJSON(),
        }),
      });

      if (res.ok) {
        let data = await res.json();
        console.log("Data::: ", data);

        if (data.modifiedCount == 1) {
          // edited successfully
          setOpenEditComment((prev) => !prev);
          setText(currentTextInput);
          setIsEdited(true);
          // update updatedAt.
          setComments((prevComments) => {
            const newArr = prevComments.map((comment) => {
              if (comment._id == _id_comment) {
                comment.updatedAt = new Date().toJSON();
                comment.commentText = currentTextInput;
                comment.isEdited = true;
                return comment;
              }
              return comment;
            });
            return newArr;
          });
        }
      }
    } catch (error) {
      console.log("Error_PUT: ", error);
      throw new Error("Error_PUT");
    }

    setLoading(false);
  }

  return (
    // <div>
    // <button onClick={openEditModal}>Edit</button>
    <>
      {/* <div onClick={() => toggledEditModal()}>CCC</div>
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-slate-400 "
        style={{
          display: openEditCommentModal ? "block" : "none",
          transform: "translate(-600px, -50px)",
        }}
      >
        <h1 className="text-[1.35rem] mb-4">Edit Comment</h1>
        <form onSubmit={handleEdit}>
          <input
            ref={editInputElement}
            type="text"
            value={currentTextInput}
            onChange={(e) => setCurrentTextInput(e.target.value)}
          />
          {loading && (
            <div>
              {"("}loading...{")"}
            </div>
          )}
        </form>
        <div onClick={toggledEditModal}>Back</div>
      </div> */}

      <Dialog open={openEditComment} onOpenChange={setOpenEditComment}>
        <DialogTrigger asChild>{/* no need for it until now */}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>{text}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <input
              ref={editInputElement}
              type="text"
              value={currentTextInput}
              onChange={(e) => setCurrentTextInput(e.target.value)}
              className="basic-input w-full"
            />

            <DialogFooter className="mt-5">
              <button type="submit">Save changes</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

    // </div>
  );
}
