"use client";

import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";
import { Button as Button_shadcn } from "@/components/ui/button";

export default function Button({
  type = "button",
  loading = false,
  disabled,
  className,
  onClick,
  children,
  style,
  styleOfButton,
}) {
  function checkType() {
    switch (styleOfButton) {
      case "danger":
        return "bg-[#ef4444] hover:bg-[#ef4444]";
      case "success":
        return "bg-[var(--success-color)] hover:bg-[var(--success-color)]";
      case "outline":
        return "bg-transparent text-[var(--text-color)] border-[1px] border-[var(var(--border-color))] hover:bg-[var(--so-light-color)]";
      case "cancel":
        return "bg-transparent text-[var(--text-color)] border-[1px] border-[var(--border-color)] hover:bg-[var(--so-light-color)]";

      // default style - main button
      default:
        return "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]";
    }
  }

  return (
    <Button_shadcn
      type={type}
      className={cn(
        `flex items-center justify-center gap-2 hover:scale-[1.0155] ${
          // main
          false
            ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]"
            : ""
        }
        ${checkType()}
        `,
        className
      )}
      disabled={loading || disabled}
      onClick={onClick}
      style={style}
    >
      {children}

      {loading && <LoadingSpinner size={{ w: "20", h: "20" }} />}
    </Button_shadcn>

    // <button
    //   type={type}
    //   className={cn(
    //     "bg-[var(--primary-color)] rounded-[7px] text-white py-2 px-3 w-fit h-fit flex justify-center items-center gap-3.5 hover:scale-[1.0185]",
    //     className
    //   )}
    //   disabled={loading}
    //   onClick={onClick}
    //   style={style}
    // >
    //   <div className="flex items-center justify-center gap-2">
    //     {children}
    //     <span>{text}</span>
    //   </div>
    //   {loading && <LoadingSpinner size={{ w: "20", h: "20" }} />}
    // </button>
  );
}
