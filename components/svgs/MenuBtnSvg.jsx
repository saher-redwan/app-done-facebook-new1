import React from "react";

export default function MenuBtnSvg({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      className={`${props.className}`}
    >
      <g id="Menu / Menu_Alt_03">
        <path
          id="Vector"
          d="M5 17H13M5 12H19M5 7H13"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <script xmlns="" />
    </svg>
  );
}
