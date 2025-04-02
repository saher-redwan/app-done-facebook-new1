"use client";

import React, { useEffect, useState } from "react";
import Modal from "../basic-items/Modal";
import { useRouter } from "next/navigation";
import Button from "@/components/basic-items/Button";
import fetchData from "@/components/custom-hooks/fetchData";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalContext } from "@/context/store";
import UploadButtonItem from "../uploadthing-items/UploadButtonItem";

const AddNewPost = ({ posts, setPosts }) => {
  const [openModal, setOpenModal] = useState(false);

  function toggleModal() {
    // check if user not loggedIn;
    if (!user) {
      route.push("/signin?callbackUrl=/");
      return;
    }
    //
    setOpenModal((prev) => !prev);
  }

  const { user } = useGlobalContext();

  const route = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // for image upload.
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [uploadingImg, setUploadingImg] = useState("not-start");
  const [imgSelected, setImgSelected] = useState("");
  const [error_img, setError_img] = useState();
  const [errMessage, setErrMessage] = useState("");
  // end image upload.

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title && !description && !imgSelected) {
      setErrMessage("You have to fill out one input at least!");
      return;
    }
    {
      setErrMessage(false);
    }

    setLoadingSubmit(true);

    // here will post without img, otherwise will post with img using useEffect below...
    if (!imgSelected) {
      await postOperation();
    }
  };

  async function postOperation(imgSelected) {
    const sentObject_withImg = {
      title: title,
      description: description,
      image: imgUrl,
      user: {
        email: user?.email,
        userImage: user?.image || null,
        publisher: user?.name || user?.email,
        _id: user?._id,
      },
      likes: {
        // count: 0,
        users: [
          // {_id: "", name: "", img: ""}
        ],
      },
      comments: {
        // count: 0,
        comments: [
          // {text: "", user: {_id: "", name: "", img: ""}}
        ],
      },
    };
    const sentObject_withoutImg = {
      title: title,
      description: description,
      user: {
        email: user?.email,
        userImage: user?.image || null,
        publisher: user?.name || user?.email,
        _id: user?._id,
      },
      likes: {
        // count: 0,
        users: [
          // {_id: "", name: "", img: ""}
        ],
      },
      comments: {
        // count: 0,
        comments: [
          // {text: "", user: {_id: "", name: "", img: ""}}
        ],
      },
    };
    function postData() {
      if (imgSelected) {
        return sentObject_withImg;
      } else {
        return sentObject_withoutImg;
      }
    }

    const { data: data_fetch } = await fetchData(
      "POST",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts`,
      postData()
    );
    // // console.log("data_fetch:::", data_fetch);

    if (data_fetch) {
      // console.log("data_fetch", data_fetch);

      setTimeout(() => {
        toggleModal();
        setLoadingSubmit(false);
        setLoadingSubmit(false);
        setImgSelected("");
        setPosts((prev) => [{ ...data_fetch.post, addedOne: true }, ...prev]);
        // reset values
        setTitle("");
        setDescription("");
        setImgUrl("");
        // }, 900);
      }, 1400);
    } else {
      // console.log("Error in server..., sorry");
      // alert("Wrong...");
      // setError("root", {
      //   // for ex: (this usually for data comes from server)
      //   // message: "This email is already taken",
      //   message: "Error in server..., sorry",
      // });
    }
  }

  useEffect(() => {
    // post if there is img
    if (imgSelected && uploadingImg == "complete" && !error_img) {
      postOperation(imgSelected);
    }
  }, [uploadingImg]);

  useEffect(() => {
    if (title != "" || description != "" || imgSelected != "") {
      setErrMessage(false);
    }
  }, [title, description, imgSelected]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSss(true);
  //   }, 6000);
  // }, []);

  // useEffect(() => {
  //   if (!isSubmitting && !startAddingPost && imgUrl) {
  //     toggleModal();
  //     reset();
  //   }
  // }, [isSubmitting, startAddingPost]);

  return (
    <div className="flex justify-center">
      <Button
        className="font-[500] py-[0.5rem] min-w-[220px] custom-background"
        onClick={() => toggleModal()}
      >
        <img
          src="/images/basic/add-things.svg"
          className="w-[25px] h-[25px]"
          style={{
            filter: "invert(1) drop-shadow(-2px 3px 2px #635353)",
          }}
        />
        <div>Add new Post</div>
      </Button>

      {/* Modal */}
      <Modal open={openModal} toggleModal={toggleModal} loading={loadingSubmit}>
        <form onSubmit={onSubmit} className="flex flex-col *:w-full">
          <div className="italic uppercase ">
            Hi, {user?.name || user?.email}
          </div>

          <div className={`${loadingSubmit && "disabled-all"} mt-4`}>
            <div className="*:w-full flex flex-col gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="basic-input"
                type="text"
                placeholder="Task Title"
              />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="basic-input"
                type="text"
                placeholder="Task Description"
              />
            </div>

            <UploadButtonItem
              setImgUrl={setImgUrl}
              loadingSubmit={loadingSubmit}
              setLoadingSubmit={setLoadingSubmit}
              uploadingImg={uploadingImg}
              setUploadingImg={setUploadingImg}
              imgSelected={imgSelected}
              setImgSelected={setImgSelected}
              error_img={error_img}
              setError_img={setError_img}
            />
          </div>

          {errMessage && (
            <div
              className="text-[var(--danger-color)] mb-[0.85rem] xxx text-center"
              style={{ animation: "opacity-translate-anim 1.2s" }}
            >
              {errMessage}
            </div>
          )}

          <Button
            className="custom-background"
            loading={loadingSubmit || uploadingImg == "starting"}
          >
            Add New Post
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewPost;

// "use client";

// import { useEffect, useState } from "react";
// import Modal from "../basic-items/Modal";
// import { useRouter } from "next/navigation";
// import Button from "@/components/basic-items/Button";
// import fetchData from "@/components/custom-hooks/fetchData";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useGlobalContext } from "@/context/store";
// import UploadButtonItem from "../uploadthing-items/UploadButtonItem";

// export default function AddNewPost({ posts, setPosts }) {
//   const [openModal, setOpenModal] = useState(false);

//   function toggleModal() {
//     // check if user not loggedIn;
//     if (!user) {
//       route.push("/signin?callbackUrl=/");
//       return;
//     }
//     //
//     setOpenModal((prev) => !prev);
//   }

//   const { user } = useGlobalContext();

//   const route = useRouter();

//   const schema = z.object({
//     // email: z.string().email(),
//     title: z.string().endsWith("."),
//     description: z.string().min(4),
//   });

//   const {
//     register,
//     handleSubmit,
//     setError,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       // title: "title...",
//     },
//     resolver: zodResolver(schema),
//   });

//   const [imgUrl, setImgUrl] = useState("");

//   const [startAddingPost, setLoadingUpload] = useState();

//   const [uploadingImg, setUploadingImg] = useState("not-start");

//   function setUploadingImg(newVal) {
//     setUploadingImg(newVal);
//   }

//   const [postInfoFromDB, setPostInfoFromDB] = useState();

//   useEffect(() => {
//     if (uploadingImg == "complete" && !isSubmitting) {
//       setTimeout(() => {
//         // setPosts([...posts, { ...postInfoFromDB.post, addedOne: true }]);
//       }, 600);
//       toggleModal();
//       reset();
//     }
//   }, [uploadingImg]);

//   useEffect(() => {
//     // console.log("000000000000000000000000000000000000,", uploadingImg);
//   }, [uploadingImg]);

//   const onSubmit = async (data) => {
//     // setLoading(true)
//     setLoadingUpload(true);

//     await new Promise((resolve) => {
//       const interval = setInterval(() => {
//         if (uploadingImg == "complete") {
//           alert(999);
//           clearInterval(interval);
//           resolve();
//         }
//       }, 100); // Check the state every 100ms
//     });

//     // console.log("data__ data__ data__");
//     // const { data: data_fetch } = fetchData(
//     //   "POST",
//     //   "${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts",
//     //   {
//     //     title: data.title,
//     //     description: data.description,
//     //     image: imgUrl,
//     //     user: {
//     //       email: user?.email,
//     //       image: user?.image || null,
//     //       publisher: user?.name || user?.email,
//     //       _id: user?._id,
//     //     },
//     //     likes: {
//     //       // count: 0,
//     //       users: [
//     //         // {_id: "", name: "", img: ""}
//     //       ],
//     //     },
//     //     comments: {
//     //       // count: 0,
//     //       comments: [
//     //         // {text: "", user: {_id: "", name: "", img: ""}}
//     //       ],
//     //     },
//     //   }
//     // )
//     // // console.log("data_fetch:::", data_fetch);

//     // // console.log("data_fetch:::", data_fetch);
//     // if (data_fetch) {
//     //   setPostInfoFromDB(data_fetch);
//     // } else {
//     //   // alert("Wrong...");
//     //   setError("root", {
//     //     // for ex: (this usually for data comes from server)
//     //     // message: "This email is already taken",
//     //     message: "Error in server..., sorry",
//     //   });
//     // }
//     // setLoadingUpload(false);

//     // await new Promise((resolve) => {
//     //   // setInterval(() => {
//     //   // console.log("uploadingImg", uploadingImg);
//     //   if (uploadingImg == "complete") {
//     //     resolve();
//     //   }
//     //   // }, 1);
//     // });

//     // setLoading(true);
//   };

//   // useEffect(() => {
//   //   if (!isSubmitting && !startAddingPost && imgUrl) {
//   //     toggleModal();
//   //     reset();
//   //   }
//   // }, [isSubmitting, startAddingPost]);

//   return (
//     <div className="flex justify-center">
//       <button
//         onClick={toggleModal}
//         className="border border-[#000] py-[5px] px-7 my-2 text-center w-[200px]"
//       >
//         Add new Post
//       </button>

//       {/* Modal */}
//       <Modal open={openModal} toggleModal={toggleModal}>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col gap-3 p-10"
//         >
//           <div className="italic uppercase ">
//             Hi, {user?.name || user?.email}
//           </div>

//           <div>
//             <input
//               {...register("title")}
//               className="border border-slate-500 px-8 py-2"
//               type="text"
//               placeholder="Task Title"
//             />
//             {errors.title && (
//               <div className="text-red-500">{errors.title.message}</div>
//             )}

//             <input
//               {...register("description")}
//               className="border border-slate-500 px-8 py-2"
//               type="text"
//               placeholder="Task Description"
//             />
//           </div>
//           {errors.description && (
//             <div className="text-red-500">{errors.description.message}</div>
//           )}

//           <div className="border-t-2 mt-3 mb-1 pt-1">
//             {errors.root && (
//               <b className="text-red-500">{errors.root.message}</b>
//             )}
//           </div>

//           <UploadButtonItem
//             imgUrl={imgUrl}
//             setImgUrl={setImgUrl}
//             startAddingPost={startAddingPost}
//             setUploadingImg={setUploadingImg}
//           />

//           <Button
//             text="Add Task"
//             loading={isSubmitting || uploadingImg == "starting"}
//           />
//         </form>
//       </Modal>
//     </div>
//   );
// }
