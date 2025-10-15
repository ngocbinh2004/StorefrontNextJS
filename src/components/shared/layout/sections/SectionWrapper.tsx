import { cn } from "@/common/utils/cn";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children?: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "my-2 flex-col items-center justify-between rounded-lg py-4 max-md:my-1 max-md:py-2",
        className,
      )}>
      {children}
    </section>
  );
}
