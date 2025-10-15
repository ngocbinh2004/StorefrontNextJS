"use client";

import { cn } from "@/common/utils/cn";
import { ReactNode, useRef, useState } from "react";

const CollapsibleBlock = ({
  children,
  className,
}: {
  children: ReactNode | string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [expand, setExpand] = useState<boolean>(false);

  const [height, setHeight] = useState<string>("auto");
  const [maxHeight, setMaxHeight] = useState<string>("800px");

  const handleExpand = () => {
    setExpand((prev) => !prev);

    // thu gọn
    if (expand && ref.current) {
      const offset = 8;
      const topPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topPosition - offset, behavior: "smooth" });

      let contentHeight = ref.current.getBoundingClientRect().height;
      if (contentHeight >= 800) {
        setHeight("800px");
      } else {
        setHeight(contentHeight.toString() + "px");
      }
    } else {
      // xem thêm
      setHeight("auto");
      setMaxHeight("");
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-white",
        "relative flex flex-col",
        expand ? "" : `overflow-hidden`,
        className,
      )}
      style={{ height: expand ? "unset" : height, maxHeight: maxHeight }}>
      {children}
      <div
        className={cn(
          "flex items-center justify-center h-16",
          "bg-gradient-to-b from-transparent via-white to-white",
          "text-primary text-center font-bold text-base",
          expand ? "" : "absolute z-50 bottom-0 left-0 w-full",
        )}>
        <button className="flex" onClick={handleExpand}>
          {expand ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
};

export default CollapsibleBlock;
