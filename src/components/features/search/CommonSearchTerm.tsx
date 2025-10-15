import PageBlockApi from "@/common/api/server/PageBlockApi";
import { MenuJson } from "@/common/types/Menu";
import Link from "next/link";

const CommontSearchTerm = async () => {
  // get pageblock Commont Search Term by identity
  const commontSearchTermItems = await PageBlockApi.getDetailByIdentifier(
    "common-search-term",
  );

  let menus: MenuJson[] = [];
  if (!commontSearchTermItems.hasError()) {
    if (commontSearchTermItems.data.items !== undefined) {
      commontSearchTermItems.data.items.map((i) => {
        return menus.push({
          name: i.title,
          url: i.link !== "" ? i.link : "/",
          icon: null,
          submenu: [],
        });
      });
    }
  }

  return (
    <div className="absolute hidden pt-1 mt-16 lg:block">
      <div className="flex justify-between gap-3 px-2 text-xs">
        {menus.length > 0
          ? menus.map((item, key) => (
              <Link
                key={key}
                href={item.url !== "" ? item.url : "/"}
                className="flex items-center space-x-1 rounded-none opacity-80 hover:opacity-100 h-11 shrink-0">
                <span className="flex-1 text-left">{item.name}</span>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default CommontSearchTerm;
