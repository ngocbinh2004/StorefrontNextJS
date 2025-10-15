import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";

export interface GoBackProps {
  href?: string;
  size?: number;
  className?: string;
  iconClassName?: string;
}

const GoBack: FC<GoBackProps> = ({ href, size, className, iconClassName }) => {
  return (
    <Link
      href={typeof href === "undefined" ? "/account" : href}
      className={
        className ||
        "p-2 absolute -mt-5 -ml-4 inline-block border-neutral-200 hover:border-primary border rounded-md"
      }
    >
      <IconChevronLeft
        size={size || 28}
        className={iconClassName || "text-primary inline-block"}
      />
    </Link>
  );
};
export default GoBack;
