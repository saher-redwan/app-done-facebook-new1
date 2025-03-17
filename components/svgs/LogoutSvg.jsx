import React from "react";

export default function LogoutSvg({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className="need-invert"
      {...props}
    >
      <path
        d="M10 12H20M20 12L17 9M20 12L17 15"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
        {...props}
      />
    </svg>
  );
}
