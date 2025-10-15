"use client";

import { MenuJson } from "@/common/types/Menu";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useRef, useState } from "react";

const HeaderNavItem = ({ item }: { item: MenuJson }) => {
  const delayTime = useRef<NodeJS.Timeout>();
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = (isOpen: boolean) => {
    if (delayTime.current) clearTimeout(delayTime.current);
    if (!isOpen) {
      delayTime.current = setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(isOpen);
    }
  };

  //ensure URL from menu is absolute
  const refineUrl = (rawUrl: string) => {
    if (rawUrl.length > 0) {
      if (rawUrl.indexOf("http") >= 0) {
        //keep original
        return rawUrl;
      } else if (rawUrl.indexOf("/") === -1) {
        //append /
        return "/" + rawUrl;
      } else {
        return rawUrl;
      }
    }

    return rawUrl;
  };

  const menuButton = (
    <Link
      href={refineUrl(item.url)}
      className="flex items-center space-x-1 rounded-none h-11 shrink-0 text-black"
    >
      {item.icon}
      <span className="flex-1 text-left">{item.name}</span>
      {item.submenu.length > 0 && <IconChevronDown size={18} />}
    </Link>
  );

  if (item.submenu.length <= 0) return menuButton;

  return (
    <Popover placement="bottom" showArrow isOpen={isOpen}>
      <PopoverTrigger
        onMouseEnter={() => handleSetIsOpen(true)}
        onMouseLeave={() => handleSetIsOpen(false)}
      >
        {menuButton}
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => handleSetIsOpen(true)}
        onMouseLeave={() => handleSetIsOpen(false)}
      >
        <ul className="flex-col gap-3">
          {item.submenu.map((subItem, i) => (
            <li key={i}>
              <Link
                href={refineUrl(subItem.url)}
                className="block w-full py-2 hover:font-bold"
              >
                {subItem.name}
              </Link>
              {subItem.submenu.length > 0 && (
                <ul>
                  {subItem.submenu.map((subItem, i) => (
                    <li key={i}>
                      <Link
                        className="block w-full py-2 text-sm cursor-pointer"
                        href={subItem.url}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderNavItem;
