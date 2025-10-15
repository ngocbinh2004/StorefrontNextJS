"use client";
import { cn } from "@/common/utils/cn";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function RatingStarsSelect({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const [hoverItem, setHoverItem] = useState(-1);
  const [activeItem, setActiveItem] = useState(-1);
  console.log(activeItem);

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => index).map((item, index) => {
          return (
            <div
              key={index}
              onMouseEnter={() => setHoverItem(item)}
              onMouseLeave={() => setHoverItem(-1)}
              onClick={() => setActiveItem(item)}
            >
              {item <= hoverItem || item <= activeItem ? (
                <IconStarFilled
                  size={size}
                  className="text-yellow-500 cursor-pointer"
                />
              ) : (
                <IconStar
                  size={size}
                  className="text-yellow-500 cursor-pointer"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
