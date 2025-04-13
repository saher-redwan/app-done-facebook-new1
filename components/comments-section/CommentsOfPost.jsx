import React, { useEffect, useRef, useState } from "react";
import Modal from "../basic-items/Modal";
import fetchData from "../custom-hooks/fetchData";
import LoadingSpinner from "../basic-items/LoadingSpinner";
import SendComment from "./SendComment";
import SingleComment from "./SingleComment";
import { AnimatePresence } from "framer-motion";

export default function CommentsOfPost({ _id_post, comments_count }) {
  const [countOfComments, setCountOfComments] = useState(comments_count || 0);

  function changeCountOfComments(newVal) {
    setCountOfComments(newVal);
  }

  const [currentPageNumOfComments, setCurrentPageNumOfComments] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadedFirstComments, setIsLoadedFirstComments] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState();

  function toggleModal() {
    setOpen(!open);
  }

  const listOfComments = useRef();

  async function getComments() {
    if (loading || loadingMore) {
      setOpen(true);
      return;
    }
    setOpen(true);

    if (!isLoadedFirstComments) {
      setIsLoadedFirstComments(true);
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const { data } = await fetchData(
      "GET",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments?postid=${_id_post}&page_num=${currentPageNumOfComments}`
    );

    // console.log("data,,", data);

    if (data) {
      // console.log("data.hasMore", data.hasMore);
      if (!data?.hasMore) {
        // // console.log("hasMore", data.hasMore);
        setHasMore(false);
      }

      // setComments((prev) => [...prev, ...data.data[0].comments.comments]);

      // solve an error with Destruction
      // let dataObj = { ...data };

      setComments((prev) => [...prev, ...data.sortedComments]);
    }

    // // console.log("8888888888888", data.data[0].comments.comments);
    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    // console.log("from useEffect");
    const handleScroll = () => {
      // console.log("loadingMore:: (Comments)", String(loadingMore));

      // Calculate scroll position and container dimensions
      const scrollTop = listOfComments.current?.scrollTop;
      const scrollHeight = listOfComments.current?.scrollHeight;
      const clientHeight = listOfComments.current?.clientHeight;

      // Check if at the bottom of the scroll container
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        // console.log("Reached the bottom of the scroll container!");
        setCurrentPageNumOfComments((prev) => prev + 1);
      }
    };

    listOfComments.current?.addEventListener("scroll", handleScroll);

    return () =>
      listOfComments.current?.removeEventListener("scroll", handleScroll);

    // why i put this with loadingMore and not [], beacause the scroll event take the first value of (loadingMore) state and not change it when update the state.
  });

  useEffect(() => {
    if (currentPageNumOfComments != 1 && !loadingMore && hasMore) {
      setTimeout(() => getComments(), 100);
    }
  }, [currentPageNumOfComments]);

  function changeSetComments(newVal) {
    setComments(newVal);
  }

  function showComments() {
    if (loading) {
      return (
        <div className="flex justify-center my-4">
          <LoadingSpinner />
        </div>
      );
      // } else if (!comments.length > 0) {
    } else if (comments?.length == 0) {
      return "no comments on this post";
    } else if (open) {
      return (
        <div
          ref={listOfComments}
          className="max-h-[50vh] overflow-auto  relative"
          style={{ animation: "show-height-slowed 2s" }}
        >
          <AnimatePresence>
            {comments.map((comment) => (
              <SingleComment
                key={comment?._id}
                comment={comment}
                _id_post={_id_post}
                setCountOfComments={changeCountOfComments}
                setComments={setComments}
                // toggledModal={open}
              />
            ))}
          </AnimatePresence>
        </div>
      );
    }
  }

  return (
    <div>
      <button>
        <span
          onClick={() => (!comments?.length ? getComments() : toggleModal())}
        >
          {countOfComments} comments
        </span>
      </button>

      <Modal open={open} toggleModal={toggleModal}>
        <div className="">
          <h2 className="text-[1.35rem] mb-4">Comments</h2>
          <div>
            <SendComment
              _id_post={_id_post}
              toggleModal={toggleModal}
              setCountOfComments={changeCountOfComments}
              setComments={changeSetComments}
            />
          </div>

          <div>{showComments()}</div>

          {loadingMore && (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
