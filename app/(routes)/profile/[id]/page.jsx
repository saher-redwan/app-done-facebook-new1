"use client";

import PostsList_Profile from "@/components/posts-section/PostsList_Profile";
import Button from "@/components/basic-items/Button";
import LoadingSpinner from "@/components/basic-items/LoadingSpinner";
import fetchData from "@/components/custom-hooks/fetchData";
import { useGlobalContext } from "@/context/store";
import changeUserData from "@/server-actions/changeUserData";
import { updateNameForPosts } from "@/server-actions/updateDataAfterChangingUserData";
import {
  useParams,
  useRouter,
  // useSearchParams
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MainContainer from "@/components/basic-items/MainContainer";
import { zeroingTheLength } from "@/lib/utils";
import EditUserInfo from "@/components/profile/EditUserInfo";

export default function Profile() {
  // this with searchParams (?id=111)...
  // const searchParams = useSearchParams();
  // const userId = searchParams.get("id");

  const params = useParams();
  const userId = params.id;

  const [isRenderedPage, setIsRenderedPage] = useState(false);

  const { user } = useGlobalContext();
  const isCurrentUserPage = user?._id == userId;

  const [visitedUser, setVisitedUser] = useState();

  useEffect(() => {
    setIsRenderedPage(true);
  }, []);

  useEffect(() => {
    async function getVisitedUserInfo() {
      if (!isCurrentUserPage && visitedUser == undefined && isRenderedPage) {
        // here is visited user, then get his info
        const { data: userInfo } = await fetchData(
          "POST",
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`,
          { userId }
        );
        if (userInfo) {
          const { userInfo: info } = userInfo;
          setVisitedUser(info);
          // // console.log("userInfo:::::", userInfo);
        }
      }
    }
    getVisitedUserInfo();
  }, [isCurrentUserPage, user, isRenderedPage]);

  const loadingStuffForUser = () => {
    if (isCurrentUserPage) {
      if (user) return false;
      else return true;
    } else {
      if (visitedUser) return false;
      else return true;
    }
  };

  const [openUpdateDateForm, setOpenUpdateDateForm] = useState(false);
  // const [isEditUserInfo, setIsEditUserInfo] = useState(false);

  return (
    <MainContainer>
      <div className="">
        <div className="px-3 sm:px-0 ">
          {loadingStuffForUser() && (
            <div className="flex justify-center mt-4">
              <LoadingSpinner />
            </div>
          )}
          {isCurrentUserPage ? (
            <>
              <div className="flex items-center gap-2 my-4">
                {user?.image && (
                  <div>
                    <img
                      src={user?.image}
                      alt=""
                      className="w-[55px] h-[55px] rounded-lg object-cover"
                    />
                  </div>
                )}
                <h1>Hi, {user?.name}</h1>
              </div>

              <Button
                onClick={() => setOpenUpdateDateForm((prev) => !prev)}
                className="my-3 bg-[var(--dark-color)]"
              >
                edit your information
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 my-4">
                {visitedUser?.image && (
                  <div>
                    <img
                      src={visitedUser?.image}
                      alt=""
                      className="w-[55px] h-[55px] rounded-lg"
                    />
                  </div>
                )}
                <h1>{visitedUser?.name}</h1>
              </div>
            </>
          )}

          {isCurrentUserPage && (
            <EditUserInfo
              loadingStuffForUser={loadingStuffForUser}
              openUpdateDateForm={openUpdateDateForm}
              userId={userId}
              setOpenUpdateDateForm={setOpenUpdateDateForm}
            />
          )}
        </div>

        <div className="mt-7">
          {/* Page owner */}
          <div>{isCurrentUserPage && <PostsList_Profile />}</div>

          {/* Visitor page */}
          {!isCurrentUserPage && visitedUser && <PostsList_Profile />}
        </div>
      </div>
    </MainContainer>
  );
}
