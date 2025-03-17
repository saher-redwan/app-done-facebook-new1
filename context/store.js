"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import AddPostSvg from "@/components/svgs/AddPostSvg";
import HomeSvg from "@/components/svgs/HomeSvg";
import ProfileSvg from "@/components/svgs/ProfileSvg";
import LogoutSvg from "@/components/svgs/LogoutSvg";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [isloadedSession, setIsloadedSession] = useState(false);

  useEffect(() => {
    // this case next-auth is preparing the session, the session will be include user object if logged in and if not will be has (null) value (not undefined)
    if (session === undefined) {
      return;
    } else {
      setIsloadedSession(true);
    }

    // console.log("session:::", session);
    setUser(session?.user);
  }, [session]);

  const initialLinks = [
    {
      link: "/",
      text: "home",
      // icon: "/images/basic/home.svg",
      icon: HomeSvg,
      active: false,
    },
    {
      link: "/addPost",
      text: "create post",
      // icon: "/images/basic/add-circle.svg",
      icon: AddPostSvg,
      imgStyle: "grayscale-[0.4] scale-[0.95]",
      active: false,
    },
    {
      link: `/profile/${user?._id}`,
      text: "profile",
      // icon: "/images/basic/profile.svg",
      icon: ProfileSvg,
      imgStyle: "scale-[0.9]",
      active: false,
    },
    {
      link: "/admin-page",
      text: "admin page",
      icon: HomeSvg,
      active: false,
    },
    {
      link: "",
      text: "settings",
      icon: HomeSvg,
      active: false,
    },
    {
      link: "/admin-page",
      text: "for admin",
      icon: HomeSvg,
      active: false,
    },
    {
      link: "?loggedOut",
      text: "logOut",
      icon: LogoutSvg,
      active: false,
    },
  ];

  const [links, setLinks] = useState(initialLinks);

  const pathname = usePathname();

  useEffect(() => {
    const newLinks = initialLinks.map((link) => {
      if (link.link == pathname) {
        return {
          ...link,
          active: true,
        };
      } else return link;
    });
    setLinks(newLinks);
  }, [pathname, user]);

  // for custom Link
  const [loadingOfPreparingFiles, setLoadingOfPreparingFiles] = useState(false);

  useEffect(() => {
    setLoadingOfPreparingFiles(false);
  }, [pathname]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          user,
          session,
          isloadedSession,
          links,
          loadingOfPreparingFiles,
          setLoadingOfPreparingFiles,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
