"use client";

import { ListInputItems } from "@/common/interfaces/ListInput";
import { MenuJson } from "@/common/types/Menu";
import useNavigation from "@/common/zustands/useNavigation";
import Link from "next/link";

const HeaderNavMobile = ({
  headerMenuItems,
}: {
  headerMenuItems: ListInputItems;
}) => {
  const [setOpenMobileMenu] = useNavigation((state) => [
    state.setOpenMobileMenu,
  ]);

  let menus: MenuJson[] = [];
  headerMenuItems.map((i) => {
    return menus.push({
      name: i.title,
      url: i.link,
      icon: null,
      submenu: [],
    });
  });

  return (
    <div className="py-4 space-y-4 text-xs">
      <div className="grid grid-cols-5 grid-rows-3 gap-1.5">
        {menus.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => setOpenMobileMenu(false)}
            className="relative flex items-center justify-center py-1 text-center border rounded cursor-pointer">
            {item.discount && item.discount > 0 ? (
              <div className="absolute right-0 top-0 text-xs bg-[#F51212] px-1 rounded">
                {`-${item.discount}%`}
              </div>
            ) : null}
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <h2 className="mb-1 text-sm font-bold">Nhóm hàng mới</h2>
          <ul className="[&_>_li+li]:border-t">
            <li>
              <Link href={"/product"} className="leading-7">
                Máy chiếu
              </Link>
            </li>
            <li>
              <Link href={"/product"} className="leading-7">
                Thiết bị nhà thông minh
              </Link>
            </li>
            <li>
              <Link href={"/product"} className="leading-7">
                Thẻ cào giảm đến 2%
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="mb-1 text-sm font-bold">Thế giới công nghệ</h2>
          <ul className="[&_>_li+li]:border-t">
            <li>
              <Link href={"/product"} className="leading-7">
                24h công nghệ
              </Link>
            </li>
            <li>
              <Link href={"/product"} className="leading-7">
                Game App
              </Link>
            </li>
            <li>
              <Link href={"/product"} className="leading-7">
                Hỏi đáp
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavMobile;
