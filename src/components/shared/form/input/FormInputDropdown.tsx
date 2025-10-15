"use client";
import { cn } from "@/common/utils/cn";
import { Divider, Input, useDisclosure } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import TextMoney from "../../displaydata/TextMoney";
import { ProductCardJson } from "@/common/types/ProductCard";
import SlugUtil from "@/common/utils/slug";

export default function FormInputDropdown({
  items,
  classNames = {
    wrapper: "",
    input: "",
    overlay: "",
    contentWrapper: "",
    contentItem: "",
  },
}: {
  items: ProductCardJson[];
  classNames?: {
    wrapper?: string;
    input?: string;
    overlay?: string;
    contentWrapper?: string;
    contentItem?: string;
  };
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleIconClick = () => {
    if (inputRef.current) inputRef.current.focus();
    onOpen();
  };

  return (
    <div
      ref={searchRef}
      className={cn("relative text-black", classNames.wrapper)}
    >
      <Input
        ref={inputRef}
        classNames={{
          base: "relative",
          inputWrapper: classNames.input,
        }}
        startContent={
          <IconSearch
            size={24}
            className="text-[#C3C3C3] shrink-0"
            onClick={handleIconClick}
          />
        }
        endContent={
          <>
            <Divider orientation="vertical" className="h-3/5" />{" "}
            <div className="w-[60px] shrink-0 text-[#2F6BFF] text-sm">
              Tìm kiếm
            </div>
          </>
        }
        onChange={onOpen}
        onFocus={onOpen}
      />
      {isOpen ? (
        <ul
          className={cn(
            "absolute z-30 mt-1 max-h-96 overflow-y-auto w-full rounded-medium bg-white text-base shadow-lg focus:outline-none md:text-sm px-4 py-3 border space-y-2",
            classNames.contentWrapper
          )}
        >
          {items.map((item) => {
            const itemUrl = SlugUtil.getUrl(
              "/dien-thoai",
              item.seo_url,
              item.id
            );
            const image =
              item.thumbnails.length > 0
                ? item.thumbnails[0].url
                : "/assets/no-image.svg";
            return (
              <li
                key={item.id}
                className={cn(
                  "flex items-center gap-2",
                  classNames.contentItem
                )}
              >
                <div className="border rounded-lg p-1">
                  <Link href={itemUrl} onClick={onClose}>
                    <Image width={42} height={42} alt="product" src={image} />
                  </Link>
                </div>
                <div className="flex-1 line-clamp-1">
                  <Link
                    href={itemUrl}
                    className="text-sm font-medium"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="flex flex-col items-end justify-center font-medium">
                  <del className="text-xs text-gray-400">
                    <bdi>
                      <TextMoney money={600000} />
                    </bdi>
                  </del>
                  <span className="text-[0.9375rem] text-red-500">
                    <TextMoney money={699000} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
