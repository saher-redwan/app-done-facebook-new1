"use client";

import { useEffect, useState } from "react";
import fetchData from "../custom-hooks/fetchData";
import UsersWhoLikedPost from "./UsersWhoLikedPost";
import { useRouter } from "next/navigation";

export default function LikeSection({
  _id_post,
  isLiked: isLikedPost,
  likes_count,
  user,
  // posts,
  // setPosts,
}) {
  const [loading, isLoading] = useState();
  const [isLiked, setIsliked] = useState(isLikedPost);
  const [likingAnimation, setLikingAnimation] = useState(false);
  const [countOfLikes, setCountOfLikes] = useState(likes_count);
  const route = useRouter();

  async function handleLikeButton() {
    if (!user?._id) {
      route.push("/signin");
      return;
    }

    isLoading(true);

    if (isLiked) {
      // operation will be Removing
      const { data } = await fetchData(
        "PUT",
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/add-remove-like-for-post`,
        {
          operation: "removing",
          _id_post,
          _id_user: user._id,
        }
      );
      setIsliked((prev) => !prev);
      setLikingAnimation(false);
      setCountOfLikes(data.likesCountOfPost.likesCountOfPost);
    } else {
      // operation will be Adding
      const { data } = await fetchData(
        "PUT",
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/add-remove-like-for-post`,
        {
          operation: "adding",
          user,
          _id_post,
          _id_user: user._id,
        }
      );
      setIsliked((prev) => !prev);
      setLikingAnimation(true);
      setCountOfLikes(data.likesCountOfPost.likesCountOfPost);
    }
    isLoading(false);
  }

  return (
    <div className="flex items-center gap-3 ml-2">
      <button
        onClick={handleLikeButton}
        className={`like-btn ${isLiked ? "liked" : ""} ${
          likingAnimation ? "liking-animation" : ""
        } px-1 rounded-md`}
        style={{
          textShadow: isLiked ? "var(--post-text-shadow)" : "none",
          backgroundImage: isLiked
            ? "linear-gradient(312deg, #f79256 2.5%, var(--dark-color))"
            : "",
        }}
        disabled={loading}
      >
        {isLiked ? "liked" : "like"}

        {/* these spans for styling */}
        <span className="b-1"></span>
        <span className="b-2"></span>
        {/* <span className="b-3"></span> */}
        {/* <span className="b-4"></span> */}
      </button>
      <UsersWhoLikedPost _id_post={_id_post} countOfLikes={countOfLikes} />
    </div>
  );
}
