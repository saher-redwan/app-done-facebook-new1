"use client";

import Link from "../basic-items/Link";
import LikeSection from "../like-section/LikeSection";
import CommentsOfPost from "../comments-section/CommentsOfPost";
import { useEffect, useRef, useState } from "react";
import Button from "../basic-items/Button";
import PostPopover from "./PostPopover";
import { motion } from "framer-motion";
import { zeroingTheLength } from "@/lib/utils";
import DeletePostAlert from "./DeletePostAlert";

// lazy imports
// const TempOne = dynamic(() => import("./TempOne"), {
//   loading: () => <LoadingProcess />,
//   ssr: false,
// });

export default function SinglePost(props) {
  const { post, setPosts, user } = props;

  const [
    isEdited,
    // setIsEdited
  ] = useState(post?.isEdited);

  const [isShowMoreParagraph, setIsShowMoreParagraph] = useState(false);

  const paragraphItem = useRef();
  const testParagraphItem = useRef();

  const [hideShowBtn, setHideShowBtn] = useState(true);

  const postRef = useRef();

  useEffect(() => {    
    console.log("from sinlge post");

    // For show btn logic
    testParagraphItem.current.style.cssText = `
      width: ${paragraphItem.current.offsetWidth}px;
      position: fixed;
      left: 0;
      top: 200px;
      background: #888;
      `;

    const itemLineHeight = String(
      window
        .getComputedStyle(testParagraphItem.current, null)
        .getPropertyValue("line-height")
    ).replace("px", "");
    const itemHeight = testParagraphItem.current.offsetHeight;
    const countOfLines = itemHeight / itemLineHeight;

    // if (countOfLines >= 4) {
    if (countOfLines >= 3.5) {
      setHideShowBtn(false);
    } else {
      setHideShowBtn(true);
    }
  }, []);

  const fontSizeOfParagraph = "text-[0.9rem]";

  // const [isDeleteItem, setIsDeleteItem] = useState(false);
  // // console.log("post?.isLiked", post?.isLiked);

  //
  const [openPostOptions, setOpenPostOptions] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  return (
    <>
      {/* {!isDeleteItem && ( */}
      <motion.div
        initial={{}}
        animate={{}}
        exit={{
          ...zeroingTheLength,
          opacity: [1, 0.8, 0],
          pointerEvents: "none",
        }}
        // transition={{ duration: 1, ease: "backInOut" }}
        transition={{ duration: 1.25, ease: "backInOut" }}
        // className="mb-7 overflow-hidden"
        className="mb-7"
      >
        <div
          key={post._id}
          ref={postRef}
          className="border border-[var(--border-color)] rounded-[7px] mt-3 overflow-hidden bg-[var(--post-bg)]"
          style={{
            animation: `${
              post.addedOne ? "created-post 2s, scale-disappear-post 2.3s" : ""
            }`,
          }}
        >
          <div className="flex justify-between gap-5 items-start px-4 mt-4">
            <div>
              <div className="flex gap-3">
                <Link
                  href={
                    user
                      ? `/profile/${post?.user?._id}`
                      : `/signin?callbackUrl=/profile/${post?.user?._id}`
                  }
                  className="font-bold flex items-center gap-2 text-sm w-fit"
                >
                  {post?.user?.userImage && (
                    <div>
                      <img
                        // src={post?.useruserImage}
                        src={post?.user?.userImage}
                        alt=""
                        className="w-[25px] h-[25px] rounded-[6px] object-cover"
                      />
                    </div>
                  )}
                  <span>{post?.user?.publisher}</span>
                </Link>
                {isEdited && (
                  <div>
                    <span className="text-[0.75rem] text-gray-600">Edited</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              {user?.email == post?.user?.email && (
                <PostPopover
                  id={post._id}
                  // setPosts={setPosts}
                  setOpenPostOptions={setOpenPostOptions}
                  openPostOptions={openPostOptions}
                  setOpenDeleteAlert={setOpenDeleteAlert}
                  // postRef={postRef}
                  // setIsDeleteItem={setIsDeleteItem}
                />
              )}
            </div>
          </div>

          <div>
            <div className="px-4 mb-2">
              <h2 className="font-bold text-[1.158rem] mt-2.5">{post.title}</h2>
              <p
                ref={paragraphItem}
                className={`${
                  !isShowMoreParagraph ? "lines-with-dots __3" : ""
                } ${fontSizeOfParagraph} !transition-none`}
              >
                {post.description}
              </p>

              {/* this item for display showBtn element below */}
              <p
                ref={testParagraphItem}
                className={`${fontSizeOfParagraph} fixed top-[2rem] left-[2rem] bg-slate-600 -z-10 opacity-0 !transition-none`}
              >
                {post.description}
              </p>
            </div>

            {!hideShowBtn && (
              <div
                onClick={() => {
                  setIsShowMoreParagraph(true);
                  setHideShowBtn(true);
                }}
                className="px-4 mb-2"
              >
                <Button
                  className="py-0.5 px-2 h-fit text-[var(--text-light-color)] border-[var(--border-color)] font-normal text-[12px] hover:text-[var(--hover-text-color)]"
                  styleOfButton="outline"
                >
                  show more
                </Button>
              </div>
            )}

            {post?.image && (
              <div>
                <img
                  src={post?.image}
                  alt=""
                  className="w-full max-h-[80vh] object-cover rounded-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* bottoms Section */}
        <div className="flex items-center gap-1.5 mt-2.5 pb-1 justify-between *:flex-1 *:text-center *:justify-center">
          <LikeSection
            likes_count={post.likes_count}
            _id_post={post._id}
            user={user}
            isLiked={post?.isLiked}
            // now this post and setPost to edit the number of likes when remove/add like. last -> we stopped it.
            // posts={posts}
            // setPosts={setPosts}
          />
          {/* <span className="pointer-events-none select-none">|</span> */}
          <CommentsOfPost
            _id_post={post._id}
            comments_count={post.comments_count}
            setPosts={setPosts}
          />
          {/* Shared (not developed yet)*/}
          <div className="flex items-center gap-1">
            <span>15</span>
            <span>shared</span>
          </div>
        </div>
      </motion.div>
      {/* )} */}

      {/* more sections (alerts, ...) */}
      <DeletePostAlert
        id={post._id}
        setPosts={setPosts}
        openDeleteAlert={openDeleteAlert}
        setOpenDeleteAlert={setOpenDeleteAlert}
      />
    </>
  );
}
