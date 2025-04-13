"use client";

import { useRef, useState } from "react";
import fetchData from "../custom-hooks/fetchData";
import LoadingSpinner from "../basic-items/LoadingSpinner";
// import Button from "@/basic-items/Button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "../basic-items/Button";
// import { Button } from "@/components/ui/button";

export default function DeleteComment({
  _id_post,
  _id_comment,
  setCountOfComments,
  setComments,
  openDeleteComment,
  setOpenDeleteComment,
}) {
  // const deleteElement = useRef();

  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    const { data } = await fetchData(
      "DELETE",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments?_id_post=${_id_post}&_id_comment=${_id_comment}`
      // {
      //   _id_post,
      //   _id_comment,
      // }
    );
    setLoading(false);

    // if (data.modifiedCount == 1) {
    if (data) {
      setOpenDeleteComment(false);
      setComments((prev) => prev.filter((comm) => comm._id != _id_comment));
      // setIsdeletedComment(true);
      // const parentEle =
      //   deleteElement.current.parentElement.parentElement.parentElement;
      // parentEle.style.animation = "2s amin-deleting-item";
      // setTimeout(() => {
      //   parentEle.style.display = "none";
      // }, 1350);
      // edit the number of comments in posts state.
      setTimeout(() => {
        setCountOfComments((prev) => (prev -= 1));
      }, 900);
    }
    // // console.log("deleteComment:;;;;;;", );
  }

  return (
    <AlertDialog open={openDeleteComment} onOpenChange={setOpenDeleteComment}>
      <AlertDialogTrigger asChild>
        {/* no need for this until now */}
      </AlertDialogTrigger>
      <AlertDialogContent
        // this property is custom, not from the library
        onClickOnOverlay={() => setOpenDeleteComment(false)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete this Comment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={`${loading ? "disabled-all" : ""}`}>
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            loading={loading}
            styleOfButton="danger"
          >
            Delete
          </Button>
          {/* <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    // <div
    //   // ref={deleteElement}
    //   onClick={handleDelete}
    //   className={`cursor-pointer flex items-center gap-2 ${
    //     loading ? "disabled-all" : ""
    //   }`}
    // >
    //   <div>
    //     <img
    //       src="/images/basic/delete-colored.svg"
    //       alt=""
    //       className="w-[25px] h-[20px]"
    //     />
    //   </div>
    //   {loading && <LoadingSpinner size={{ w: "22", h: "22" }} />}
    // </div>
  );
}
