"use client";

import fetchData from "../custom-hooks/fetchData";
import Button from "../basic-items/Button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

export default function SendComment({
  _id_post,
  setCountOfComments,
  setComments,
}) {
  // const route = useRouter();
  const { user } = useGlobalContext();

  const schema = z.object({
    // email: z.string().email(),
    commentText: z.string().trim().min(1, { message: "This is Required" }),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      // title: "title...",
    },
    resolver: zodResolver(schema),
  });

  const route = useRouter();

  const onSubmit = async (data) => {
    if (!user?._id) {
      route.push("/signin");
      return;
    }

    const commentInfo = {
      _id: Math.random().toString(18) + "000" + Math.random().toString(18),
      _id_post,
      commentText: data.commentText,
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      user: {
        email: user?.email,
        image: user?.image || null,
        name: user?.name,
        _id: user?._id,
      },
      // this for style
      addAnimation: true,
    };

    const { data: data_fetch } = await fetchData(
      "POST",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments`,
      commentInfo
    );
    // console.log("data_fetch:::", data_fetch);
    if (data_fetch) {
      // toggleModal();
      reset();
      setComments((prev) => [commentInfo, ...prev]);

      // below not work!!
      // setTimeout(() => route.refresh(), 10);

      setTimeout(() => {
        setCountOfComments((prev) => (prev += 1));
      }, 900);

      // this to remove animation added effect after 2s so that the animation ended.
      setTimeout(() => {
        setComments((prev) => {
          return prev.map((comment) => {
            if (comment._id == commentInfo._id) {
              comment.addAnimation = false;
              return comment;
            }
            return comment;
          });
        });
      }, 2000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-7 *:w-full">
        <input
          {...register("commentText")}
          className="basic-input"
          type="text"
          placeholder=" write comment..."
        />

        {errors.commentText && (
          <div className="text-red-500 mt-1 mb-3">
            {errors.commentText.message}
          </div>
        )}

        {errors.root && (
          <div className="border-t-2 mt-3 mb-1 pt-1">
            <b className="text-red-500">{errors.root.message}</b>
          </div>
        )}
        <Button loading={isSubmitting} className=" mt-3">
          Add Comment
        </Button>
      </form>
    </div>
  );
}
