import Link from "../basic-items/Link";
import React from "react";

export default function Logo({ forMobileStyle }) {
  return (
    <div>
      <Link
        href="/"
        className={`
           text-[#fff] text-[1.135rem] tracking-[1.5px] font-[300] ${
             forMobileStyle ? forMobileStyle : ""
           }`}
      >
        LOGO
      </Link>
    </div>
  );
}
