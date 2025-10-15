import { cn } from "@/common/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";

export default function HeaderButton({
  className,
  icon,
  url,
  label,
}: {
  className?: string;
  icon?: ReactNode;
  url: string;
  label: ReactNode;
}) {
  return (
    <Link
      className={cn(
        "flex items-center gap-1 px-1 py-1 text-xs font-medium rounded-[7px] text-black",
        className
      )}
      href={url}
    >
      {icon}
      {label}
    </Link>
  );
}
