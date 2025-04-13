import Link from "../basic-items/Link";
import React from "react";

export default function Logo({ className, style }) {
  return (
    <div>
      <Link
        href="/"
        className={`
            text-[1.135rem] tracking-[1.5px] font-[300] ${className}`}
        style={style}
      >
        LOGO
      </Link>
    </div>
  );
}
