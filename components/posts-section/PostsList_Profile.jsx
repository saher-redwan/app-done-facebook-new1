"use client";

import fetchData from "../custom-hooks/fetchData";
// import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import LoadingSpinner from "../basic-items/LoadingSpinner";
import { useGlobalContext } from "@/context/store";
import SinglePost from "./SinglePost";
import { useParams } from "next/navigation";

export default function PostsList() {
  const { user, isloadedSession } = useGlobalContext();
  const [loading, setLoading] = useState();

  const [loadingMore, setLoadingMore] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isSentRequest, setIsSentRequest] = useState(false);

  const [currentPageNumOfPosts, setCurrentPageNumOfPosts] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadedFirstPosts, setIsLoadedFirstPosts] = useState(false);

  const params = useParams();
  const userId = params.id;

  const getPosts = async () => {
    setIsSentRequest(true);
    // setloading(true);

    if (!isLoadedFirstPosts) {
      setIsLoadedFirstPosts(true);
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const { data } = await fetchData(
        "GET",
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts?userid=${userId}&page_num=${currentPageNumOfPosts}`
      );
      // console.log("sss", data);
      // console.log("userWholiked0000", user?._id);
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
      return posts
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((post) => (
          <SinglePost
            key={post._id}
            post={post}
            posts={posts}
            setPosts={changeSetPosts}
            user={user}
          />
        ));
    }
  }

  return (
    <>
      {isloadedSession ? (
        <>
          <div className="mt-7">
            <div className="mt-5">{isSentRequest && showPosts()}</div>
            {loadingMore && (
              <div className="flex justify-center mt-5 mb-20 h-[40vh]">
                <LoadingSpinner />
              </div>
            )}
            {!hasMore && posts.length > 0 && (
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

// "use client";

// import fetchData from "../custom-hooks/fetchData";
// // import { getServerSession } from "next-auth";
// import { useEffect, useState } from "react";
// import LoadingSpinner from "../basic-items/LoadingSpinner";
// import { useGlobalContext } from "@/context/store";
// import SinglePost from "./SinglePost";
// import { useParams } from "next/navigation";

// export default function PostsList() {
//   const { user, isloadedSession } = useGlobalContext();
//   const [loading, setloading] = useState();

//   const [posts, setPosts] = useState([]);
//   const [isSentRequest, setIsSentRequest] = useState(false);

//   const params = useParams();
//   const userId = params.id;

//   const getPosts = async () => {
//     setIsSentRequest(true);
//     setloading(true);

//     try {
//       const { data } = await fetchData(
//         "GET",
//         `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts?userid=${userId}`
//       );
//       // console.log("sss", data);
//       // console.log("userWholiked0000", user?._id);
//       if (data) {
//         if (user?._id) {
//           const postsWith_IsLikedProperty = data.posts.map((post) => {
//             if (post.likes.users.length > 0) {
//               // post.likeeee = true;
//               // return post;
//               post.likes.users.forEach((userWholiked) => {
//                 if (userWholiked._id == user?._id) {
//                   post.isLiked = true;
//                   // // console.log('post 0 0 0 ', post);
//                   return post;
//                 }
//               });
//             }
//             return post;
//           });
//           setPosts(postsWith_IsLikedProperty);
//         } else {
//           // no user logged in.
//           setPosts(data.posts);
//         }
//       }

//       // console.log("data:::::", data);
//       throw new Error("Failed to fetch Posts");
//     } catch (error) {
//       // console.log("Error loading Posts: ", error);
//     }
//     setloading(false);
//   };

//   useEffect(() => {
//     if (!isloadedSession) {
//       return;
//     }
//     getPosts();
//   }, [isloadedSession]);

//   // this for pass setState to child component.
//   function changeSetPosts(newArr) {
//     setPosts(newArr);
//   }

//   function showPosts() {
//     if (loading) {
//       return (
//         <div className="flex justify-center mt-8">
//           <LoadingSpinner />
//         </div>
//       );
//     } else if (!posts.length > 0) {
//       return "no posts yet";
//     } else {
//       return posts
//         .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
//         .map((post) => (
//           <SinglePost
//             key={post._id}
//             post={post}
//             posts={posts}
//             setPosts={changeSetPosts}
//             user={user}
//           />
//         ));
//     }
//   }

//   return (
//     <>
//       <div>{isSentRequest && showPosts()}</div>
//     </>
//   );
// }
