// this for loading pages.

import LoadingSpinner from "@/components/basic-items/LoadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 mb-3">
      <LoadingSpinner size={{ w: "22", h: "22" }} />
      <span>page is loading...</span>
    </div>
  );
}
