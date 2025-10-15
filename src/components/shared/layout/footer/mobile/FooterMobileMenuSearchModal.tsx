"use client";
import { IconSearch } from "@tabler/icons-react";

export default function FooterMobileMenuSearchModal() {
  return (
    <div>
      <div
        onClick={() => {
          window.scrollTo({ top: 0 });
          setTimeout(() => {
            document.getElementById("page-search-input")?.focus();
          }, 200);
        }}
        className="flex flex-col justify-center items-center text-[9px] gap-1 cursor-pointer"
      >
        <IconSearch />
        <span>Tìm kiếm</span>
      </div>
    </div>
  );
}
