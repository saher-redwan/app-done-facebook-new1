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
import Image from "next/image";
import CancelSvg from "../svgs/CancelSvg";
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

  const imgOfPostRef = useRef();
  const [objectFitOfPostImg, setObjectFitOfPostImg] = useState("cover");

  // eidt objectFit of the img;
  const check = () => {
    console.log("5465456464");

    if (imgOfPostRef.current?.offsetHeight / window.innerHeight < 80 / 100) {
      // cover
      setObjectFitOfPostImg("cover");
    } else {
      // container
      setObjectFitOfPostImg("contain");
    }
  };

  useEffect(() => {
    imgOfPostRef.current?.addEventListener("load", () => {
      check();
      imgOfPostRef.current.style.opacity = "1";
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", check);

    // cleanUp
    return () => window.removeEventListener("resize", check);
  }, []);

  // open post img
  const [openPostImg, setOpenPostImg] = useState(false);

  useEffect(() => {
    if (openPostImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openPostImg]);

  // useEffect(() => {
  //   const handleClick = (event) => {
  //     if (imgOfPostRef.current != event.target) {
  //       setOpenPostImg(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClick);

  //   // Cleanup listener on component unmount
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, []);

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
                  {console.log(post)
                }
                  {post?.user?.userImage && (
                    <div>
                      <img
                        // src={post?.userImage}
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
            <div className="px-4 mb-3">
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
              <div
                // ref={postImgContainer}

                // onMouseLeave={() => setOpenPostImg((prev) => !prev)}
                className={`${
                  openPostImg
                    ? "fixed top-0 left-[50%] translate-x-[-50%] w-fit h-[100vh] z-[100] overflow-auto"
                    : ""
                }`}
                style={{
                  boxShadow: openPostImg && "0 0 18px var(--box-shadow-color)",
                }}
              >
                <div>
                  {/* <img
                  src={post?.image}
                  alt=""
                  className="w-full max-h-[80vh] object-cover rounded-none"
                /> */}
                  <Image
                    ref={imgOfPostRef}
                    src={post?.image}
                    onClick={() =>
                      objectFitOfPostImg == "contain" && setOpenPostImg(true)
                    }
                    alt="img"
                    className="w-full max-h-[80vh] object-cover rounded-none"
                    width="500"
                    height="500"
                    quality={100}
                    style={{
                      objectFit: objectFitOfPostImg,
                      opacity: "0",
                      transition: "0.25s",
                      maxHeight: openPostImg ? "unset" : "80vh",
                      cursor: openPostImg
                        ? "unset"
                        : objectFitOfPostImg == "contain"
                        ? "pointer"
                        : "unset",
                    }}
                    // placeholder="blur"
                    //
                  />

                  {/* Cancel zoom */}
                  <CancelSvg
                    className="close-postImg-btn absolute top-0 w-[35px] h-[35px] bg-[var(--border-color)] rounded-full right-0 opacity-80 cursor-pointer"
                    onClick={() => setOpenPostImg(false)}
                    style={{ display: openPostImg ? "block" : "none" }}
                  />
                </div>
              </div>
            )}
            {/* overlay */}
            <div
              className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10 bg-[var(--black-overlay)]"
              onClick={() => setOpenPostImg(false)}
              style={{
                opacity: openPostImg ? "1" : "0",
                transition: "0.385s",
                pointerEvents: openPostImg ? "unset" : "none",
                // backgroundColor: "var(--black-overlay)",
              }}
            ></div>
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
