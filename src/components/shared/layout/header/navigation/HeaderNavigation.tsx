import PageBlockApi from "@/common/api/server/PageBlockApi";
import { ListInputItems, ListItemSimple } from "@/common/interfaces/ListInput";
import { MenuJson } from "@/common/types/Menu";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceMobileCharging,
  IconDeviceMobileDollar,
  IconDeviceTablet,
  IconDeviceWatch,
  IconGift,
  IconHeadphones,
  IconNews,
  IconSmartHome,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import HeaderNavItem from "./HeaderNavItem";
import Image from "next/image";

const HeaderNavigation = ({
  headerMenuItems,
}: {
  headerMenuItems: ListInputItems;
}) => {
  const mappingSubmenu = (children: ListItemSimple[]) => {
    let submenu: MenuJson[] = [];
    children.map((child) => {
      return submenu.push({
        name: child.title,
        url: child.link !== "" ? child.link : "/",
        icon: null,
        submenu: [],
      });
    });
    return submenu;
  };

  const findIcon = (item: ListItemSimple) => {
    let icon = null;
    let size = 20;

    if (item.photo.files.length > 0) {
      icon = (
        <Image
          src={item.photo.files[0].url}
          width={24}
          height={24}
          alt="icon"
          className={item.description}
        />
      );
    } else {
      switch (item.description) {
        case "device-mobile":
          icon = <IconDeviceMobile size={size} />;
          break;
        case "device-tablet":
          icon = <IconDeviceTablet size={size} />;
          break;
        case "device-laptop":
          icon = <IconDeviceLaptop size={size} />;
          break;
        case "device-mobile-dollar":
          icon = <IconDeviceMobileDollar size={size} />;
          break;
        case "device-mobile-charging":
          icon = <IconDeviceMobileCharging size={size} />;
          break;
        case "device-watch":
          icon = <IconDeviceWatch size={size} />;
          break;
        case "headphones":
          icon = <IconHeadphones size={size} />;
          break;
        case "smart-home":
          icon = <IconSmartHome size={size} />;
          break;
        case "gift":
          icon = <IconGift size={size} />;
          break;
        case "switch-horizontal":
          icon = <IconSwitchHorizontal size={size} />;
          break;
        case "news":
          icon = <IconNews size={size} />;
          break;
      }
    }

    return icon;
  };

  let menus: MenuJson[] = [];
  headerMenuItems.map((i) => {
    return menus.push({
      name: i.title,
      url: i.link !== "" ? i.link : "/",
      icon: findIcon(i),
      submenu:
        typeof i.children !== "undefined" && i.children.length > 0
          ? mappingSubmenu(i.children)
          : [],
    });
  });

  return (
    <nav className="container overflow-x-scroll overflow-y-hidden text-black no-scrollbar">
      <div className="flex justify-between gap-3 py-1 text-sm">
        {menus.length > 0
          ? menus.map((item) => <HeaderNavItem key={item.name} item={item} />)
          : null}
      </div>
    </nav>
  );
};

export default HeaderNavigation;
