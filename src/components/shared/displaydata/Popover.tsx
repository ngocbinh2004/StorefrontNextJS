"use client";

import {
  PopoverContent,
  Popover as PopoverNextUI,
  PopoverTrigger,
} from "@nextui-org/popover";
import { ReactNode, useRef, useState } from "react";

export default function Popover({
  trigger,
  popoverContent,
}: {
  trigger: ReactNode;
  popoverContent: ReactNode;
}) {
  return (
    <PopoverNextUI disableAnimation placement="bottom">
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        {popoverContent}
      </PopoverContent>
    </PopoverNextUI>
  );
}
