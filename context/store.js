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
import SunSvg from "@/components/svgs/SunSvg";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [isloadedSession, setIsloadedSession] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   console.log("session::::::", session);
  // }, [session?.user]);

  useEffect(() => {
    // this case next-auth is preparing the session, the session will be include user object if logged in and if not will be has (null) value (not undefined)
    if (session === undefined) {
      return;
    } else {
      setIsloadedSession(true);
    }

    console.log("session:::", session);
  }, [session]);

  useEffect(() => {
    setUser(session?.user);
  }, [session?.user]);

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
      styleOfSvg: { scale: "0.9" },
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
      styleOfSvg: { scale: "0.9" },
      active: false,
      authorized: true,
    },
    {
      link: `/game`,
      text: "Game",
      // icon: "/images/basic/profile.svg",
      icon: GameSvg,
      // imgStyle: "scale-[0.8]",
      styleOfSvg: { scale: "0.8" },
      active: false,
    },
    {
      link: "/settings",
      text: "settings",
      icon: SettingsSvg,
      active: false,
      styleOfSvg: { scale: "0.8" },
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
      typeOfElement: "button",
      text: "Dark Mode",
      icon: MoonSvg,
      active: false,
      styleOfSvg: {
        scale: "0.725",
        transform: "translateX(-1px)",
      },
      purpose: "darkMode",
      display: !darkMode,
      // for animation
      isClicked: false,
    },
    {
      typeOfElement: "button",
      text: "Light Mode",
      icon: SunSvg,
      active: false,
      styleOfSvg: {
        scale: "0.675",
      },
      purpose: "darkMode",
      display: darkMode,
      // for animation
      isClicked: false,
    },
    {
      typeOfElement: "button",
      purpose: "logout",
      text: "logOut",
      icon: LogoutSvg,
      active: false,
      authorized: true,
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

  useEffect(() => {
    console.log("links", links);
  }, [links]);

  // for custom Link
  const [loadingOfPreparingFiles, setLoadingOfPreparingFiles] = useState(false);

  useEffect(() => {
    setLoadingOfPreparingFiles(false);
  }, [pathname]);

  // for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    // setLinks(initialLinks);
  }, [darkMode]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          user,
          session,
          isloadedSession,
          links,
          setLinks,
          loadingOfPreparingFiles,
          setLoadingOfPreparingFiles,
          darkMode,
          setDarkMode,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
