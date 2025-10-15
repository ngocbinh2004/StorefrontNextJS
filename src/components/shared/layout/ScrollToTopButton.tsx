"use client";

import { useEffect, useState } from "react";
import { IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/common/utils/cn";
import Helper from "@/common/utils/helper";

const ScrollToTopButton = () => {
  const isMobileDevices = Helper.detectingCSRMobileDevices();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      let minHeight = 500;

      if (isMobileDevices) {
        minHeight = 430;
      }

      // if the user scrolls down, show the button
      window.scrollY > minHeight ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isMobileDevices]);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };

  return (
    <button
      className={cn(
        "fixed flex items-center justify-center rounded shadow-md cursor-pointer shadow-gray-300 max-md:back-to-top-mobile bg-primary w-9 h-9 ",
        isVisible ? "opacity-100" : "opacity-0",
        isMobileDevices ? "bottom-16 right-2" : "bottom-5 right-5",
      )}
      onClick={scrollToTop}>
      <IconChevronUp className="text-white" />
    </button>
  );
};

export default ScrollToTopButton;
