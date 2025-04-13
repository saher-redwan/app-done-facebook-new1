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
import GameSvg from "@/components/svgs/GameSvg";
import SettingsSvg from "@/components/svgs/SettingsSvg";
import MoonSvg from "@/components/svgs/MoonSvg";

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

  // useEffect(() => {
  //   console.log("user:::::, ", user);

  // },[user])

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
      // imgStyle: "grayscale-[0.4] scale-[0.95]",
      style: { scale: "0.9" },
      active: false,
      // groupHover: 'group-hover:transform group-hover:skew-y-[20deg] group-hover:skew-x-[-10deg] group-hover:rotate-3d-[1,1,1,35deg] group-hover:rotate-[50deg]',
      hoverSvgEffect: true,
    },
    {
      link: `/profile/${user?._id}`,
      text: "profile",
      // icon: "/images/basic/profile.svg",
      icon: ProfileSvg,
      // imgStyle: "scale-[0.9]",
      style: { scale: "0.9" },
      active: false,
    },
    {
      link: `/game`,
      text: "Game",
      // icon: "/images/basic/profile.svg",
      icon: GameSvg,
      // imgStyle: "scale-[0.8]",
      style: { scale: "0.8" },
      active: false,
    },
    {
      link: "/settings",
      text: "settings",
      icon: SettingsSvg,
      active: false,
      style: { scale: "0.8" },
      hoverSvgEffect: true,
    },
    {
      link: "/admin-page",
      text: "admin page",
      icon: HomeSvg,
      active: false,
    },

    {
      link: "/admin-page",
      text: "admin page",
      icon: HomeSvg,
      active: false,
    },
    {
      link: "?loggedOut",
      text: "logOut",
      icon: LogoutSvg,
      active: false,
    },
    {
      link: "#",
      text: "Dark Mood",
      icon: MoonSvg,
      active: false,
      style: { scale: "0.725", marginLeft: "-1px" },
      typeOfElement: "button"
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
