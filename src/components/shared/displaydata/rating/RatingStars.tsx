"use client";
import { cn } from "@/common/utils/cn";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

export default function RatingStars({
  size = 18,
  rating,
  showNumber,
  className,
}: {
  size?: number;
  rating: number;
  showNumber?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      {showNumber && <p className="mr-2 text-4xl font-bold">{rating}</p>}
      <div className="flex gap-[0.5px]">
        {Array.from({ length: 5 }, (_, index) => index).map((item, index) => {
          if (rating % 1 !== 0 && Math.ceil(rating) === index + 1)
            return (
              <IconStarHalfFilled
                key={index}
                size={size}
                className="text-[#F2994A]"
              />
            );
          if (index < rating)
            return (
              <IconStarFilled
                key={index}
                size={size}
                className="text-[#F2994A]"
              />
            );
          return (
            <IconStar key={index} size={size} className="text-[#F2994A]" />
          );
        })}
      </div>
    </div>
  );
}
