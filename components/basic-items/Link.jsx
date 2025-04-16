"use client";

// Note: this just used in client components

import { useGlobalContext } from "@/context/store";
import { default as NextLink } from "next/link";
import { usePathname } from "next/navigation";

export default function Link({
  children,
  onClick = () => null,
  className,
  href = "/",
  style,
  typeOfElement,
}) {
  const { setLoadingOfPreparingFiles } = useGlobalContext();

  const pathname = usePathname();

  return (
    <NextLink
      href={href}
      onClick={() => {
        href !== "" &&
          !pathname.toLowerCase().includes(href.toLowerCase()) &&
          (() => {
            if (typeOfElement != "button") {
              setLoadingOfPreparingFiles(true);
            }
            onClick();
          })();
      }}
      className={className}
      style={style}
    >
      {children}
    </NextLink>
  );
}
