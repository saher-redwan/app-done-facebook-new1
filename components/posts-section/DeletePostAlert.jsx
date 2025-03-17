"use client";

import { useRef, useState } from "react";
import LoadingSpinner from "../basic-items/LoadingSpinner";
import fetchData from "../custom-hooks/fetchData";
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

export default function DeletePostAlert({
  id,
  setPosts,
  // postRef,
  openDeleteAlert,
  setOpenDeleteAlert,
  // setIsDeleteItem,
}) {
  const [loading, setLoading] = useState(false);

  // let [loading, setLoading] = useState(false);
  const deletePost = async () => {
    // const confirmed = confirm("Are you sure?");

    // if (confirmed) {
    setLoading(true);
    const { data } = await fetchData(
      "DELETE",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts?id=${id}`
    );
    setLoading(false);

    // for some animation
    if (data) {
      // postRef.current.style.animation = "2s amin-deleting-item";
      setOpenDeleteAlert(false);
      setTimeout(() => {
        setPosts((prev) => prev.filter((post) => post._id != id));
      }, 100);

      // setTimeout(() => {
      //   setIsDeleteItem(true);
      // }, 100);
      // for animaiton

      // setTimeout(() => {
      //   // remove the item from array in frontend after removing it from backend(server)(db, fatabase).
      //   setPosts((prev) => {
      //     const newArr = prev.filter((item) => item._id != id);
      //     return newArr;
      //   });
      //   // }, 1000);
      // }, 1850);
    }
    // }
  };

  return (
    <>
      {/*  */}
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogTrigger asChild>
          {/* no need for this yet */}
        </AlertDialogTrigger>
        <AlertDialogContent
          // this property is custom, not from the library
          onClickOnOverlay={() => !loading && setOpenDeleteAlert(false)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Post from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel className={`${loading ? "disabled-all" : ""}`}>
              Cancel
            </AlertDialogCancel> */}
            <Button
              onClick={() => !loading && setOpenDeleteAlert(false)}
              styleOfButton="cancel"
            >
              Cancel
            </Button>
            {/* <AlertDialogAction onClick={deletePost}>Continue</AlertDialogAction> */}
            <Button
              onClick={deletePost}
              loading={loading}
              // like danger
              styleOfButton="danger"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
