"use client";

import fetchData from "../custom-hooks/fetchData";
// import { getServerSession } from "next-auth";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../basic-items/LoadingSpinner";
import { useGlobalContext } from "@/context/store";
import AddNewPost from "./AddNewPost";
import SinglePost from "./SinglePost";
import { AnimatePresence } from "framer-motion";

export default function PostsList() {
  const { user, isloadedSession } = useGlobalContext();
  const [loading, setLoading] = useState();
  const [loadingMore, setLoadingMore] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isSentRequest, setIsSentRequest] = useState(false);

  const [currentPageNumOfPosts, setCurrentPageNumOfPosts] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoadedFirstPosts, setIsLoadedFirstPosts] = useState(false);

  const getPosts = async () => {
    setIsSentRequest(true);

    if (!isLoadedFirstPosts) {
      setIsLoadedFirstPosts(true);
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const { data } = await fetchData(
        "GET",
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts?page_num=${currentPageNumOfPosts}`
      );

      if (data) {
        if (!data?.hasMore) {
          // console.log("hasMore", data.hasMore);
          setHasMore(false);
        }
        // this for compare if user liked the post or not
        if (user?._id) {
          const postsWith_IsLikedProperty = data.posts.map((post) => {
            if (post.likes.users.length > 0) {
              post.likes.users.forEach((userWholiked) => {
                if (userWholiked._id == user?._id) {
                  post.isLiked = true;
                  return post;
                }
              });
            }
            return post;
          });
          setPosts((prev) => [...prev, ...postsWith_IsLikedProperty]);
        } else {
          // no user logged in.
          setPosts((prev) => [...prev, ...data.posts]);
        }
      }

      // console.log("data:::::", data);
      throw new Error("Failed to fetch Posts");
    } catch (error) {
      // console.log("Error loading Posts: ", error);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !loadingMore
      ) {
        setCurrentPageNumOfPosts((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

    // why i put this with loadingMore and not [], beacause the scroll event take the first value of (loadingMore) state and not change it when update the state.
  }, [loadingMore]);

  useEffect(() => {
    if (currentPageNumOfPosts != 1 && !loadingMore && hasMore) {
      setTimeout(() => getPosts(), 100);
    }
  }, [currentPageNumOfPosts]);

  useEffect(() => {
    if (!isloadedSession) {
      return;
    }
    getPosts();
  }, [isloadedSession]);

  // this for pass setState to child component.
  function changeSetPosts(newArr) {
    setPosts(newArr);
  }

  function showPosts() {
    if (loading) {
      return (
        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      );
    } else if (!posts.length > 0) {
      return "no posts yet";
    } else {
      return (
        <AnimatePresence>
          {posts
            // .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((post) => (
              <SinglePost
                key={post._id}
                post={post}
                posts={posts}
                setPosts={changeSetPosts}
                user={user}
              />
            ))}
        </AnimatePresence>
      );
    }
  }

  return (
    <>
      {isloadedSession ? (
        <>
          <div className="mt-7">
            <AddNewPost posts={posts} setPosts={changeSetPosts} />

            <div className="mt-5">{isSentRequest && showPosts()}</div>
            {loadingMore && (
              <div className="flex justify-center mt-5 mb-20 h-[40vh]">
                <LoadingSpinner />
              </div>
            )}
            {!hasMore && (
              <div className="text-center my-10 mb-20">No More Posts</div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center mt-5">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
