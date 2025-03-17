"use client";

// import Link from "next/link";
import Link from "./Link";
import { signOut } from "next-auth/react";
import { useGlobalContext } from "@/context/store";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function MainLinksMenu({
  forMobileStyle,
  toggleOpenSheet,
  widthOfMainLinks,
}) {
  const { user, links } = useGlobalContext();

  const sideLinks = useRef();

  useEffect(() => {
    // window.addEventListener("scroll", () => {
    // const parentElem = sideLinks.current.parentElement.parentElement;
    // parentElem.style.width = `calc(100% - ${widthOfSideLinks})`;
    // });
  }, []);

  return (
    <div
      ref={sideLinks}
      className={`static lg:fixed left-0 h-full z-10 ${widthOfMainLinks?.start} ${widthOfMainLinks?.maxL}`}
    >
      <div className="flex flex-col gap-1 mt-6">
        {links?.map((link, index) => {
          if (!user?._id) {
            if (
              link.link.startsWith("/profile") ||
              link.link.startsWith("?loggedOut")
            ) {
              console.log("from denied");
              return;
            } else {
              return (
                <LinkItem
                  key={index}
                  link={link}
                  toggleOpenSheet={toggleOpenSheet}
                />
              );
            }
          } else {
            return (
              <LinkItem
                key={index}
                link={link}
                toggleOpenSheet={toggleOpenSheet}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

const classOfActive =
  "flex items-center gap-1.5 hover:bg-[var(--so-light-color)] py-1 rounded-[0px_var(--border-radius)_var(--border-radius)_0px]";

function LinkItem({ link, toggleOpenSheet }) {
  // this for button such as login button.
  if (link.link == "?loggedOut") {
    return (
      <button
        type="button"
        href={link.link}
        key={Math.random()}
        className={`${link.active ? "active-link" : ""} ${classOfActive}`}
        onClick={() => link.text == "logOut" && signOut()}
      >
        {/* <img
          src={link.icon}
          alt=""
          className={`w-[2.25rem] h-[2.25rem] ${link?.imgStyle}`}
        /> */}
        <link.icon width="2.25rem" height="2.25rem" />
        <span>{link.text}</span>
      </button>
    );
  }
  return (
    <div onClick={toggleOpenSheet}>
      {/* <div>
        <img src="/images/basic/logout.svg" alt="" />
      </div> */}
      <Link
        href={link.link}
        key={Math.random()}
        className={`${link.active ? "active-link" : ""} ${classOfActive}`}
        onClick={() => link.text == "logOut" && signOut()}
      >
        {/* <img
          src={link.icon}
          alt=""
          className={`w-[2.25rem] h-[2.25rem] ${link?.imgStyle}`}
        /> */}
        <link.icon width="2.25rem" height="2.25rem" />
        <span>{link.text}</span>
      </Link>
    </div>
  );
}
