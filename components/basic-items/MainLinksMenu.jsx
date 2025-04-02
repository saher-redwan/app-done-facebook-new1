"use client";

// import Link from "next/link";
import Link from "./Link";
import { signOut } from "next-auth/react";
import { useGlobalContext } from "@/context/store";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import style_links from "./moduleStyles/style.module.css";

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
          // case no user
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
          }

          // case with user
          else {
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

const classText =
  "flex items-center gap-1.5 hover:bg-[var(--so-light-color)] py-1 rounded-[0px_var(--border-radius)_var(--border-radius)_0px] px-2";

function LinkItem({ link, toggleOpenSheet }) {
  const content = (
    <>
      <span style={link?.style}>
        <link.icon width="2.25rem" height="2.25rem" />
      </span>
      <span>{link.text}</span>
    </>
  );

  // this for button such as login button.
  if (link.link == "?loggedOut") {
    return (
      <button
        type="button"
        href={link.link}
        key={Math.random()}
        className={`${link.active ? "active-link" : ""} ${classText}`}
        onClick={() => link.text == "logOut" && signOut()}
      >
        {content}
      </button>
    );
  }

  function chechTextOfLinks(link) {
    if (link?.hoverSvgEffect) {
      switch (link.link) {
        case "/settings":
          return style_links.hoverEffect_Settings;
        case "/addPost":
          return style_links.hoverEffect_Add;
      }
    }
  }

  // these for links
  return (
    <div onClick={toggleOpenSheet}>
      {/* <div>
        <img src="/images/basic/logout.svg" alt="" />
      </div> */}
      <Link
        href={link.link}
        key={Math.random()}
        className={`${link.active ? "active-link" : ""} ${
          link?.hoverSvgEffect ? chechTextOfLinks(link) : ""
        } ${classText}`}
        onClick={() => link.text == "logOut" && signOut()}
      >
        {content}
      </Link>
    </div>
  );
}
