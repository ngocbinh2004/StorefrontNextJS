import { cn } from "@/common/utils/cn";
import { ReactNode } from "react";

export function PageSizeWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("grid grid-cols-12 max-md:grid-cols-1 gap-10", className)}
    >
      {children}
    </div>
  );
}

export function PageSidebar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-3 space-y-8 max-xl:order-2 max-xl:w-full max-md:hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-12 space-y-8 max-xl:order-1 max-xl:col-span-1",
        className
      )}
    >
      {children}
    </div>
  );
}
