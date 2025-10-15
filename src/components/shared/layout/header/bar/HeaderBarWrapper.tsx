"use client";

import useNavigation from "@/common/zustands/useNavigation";
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { IconMenu2 } from "@tabler/icons-react";
import { ReactNode } from "react";

const HeaderBarWrapper = ({
  content,
  menuContent,
}: {
  content: ReactNode;
  menuContent: ReactNode;
}) => {
  const [openMobileMenu, setOpenMobileMenu] = useNavigation((state) => [
    state.openMobileMenu,
    state.setOpenMobileMenu,
  ]);

  return (
    <Navbar
      disableAnimation
      isBlurred={false}
      isMenuOpen={openMobileMenu}
      onMenuOpenChange={setOpenMobileMenu}
      className="container static max-lg:border-b header-bg"
      classNames={{ wrapper: "max-w-full px-0 my-2 h-auto" }}
    >
      <NavbarContent className="flex items-center gap-4 py-2 max-md:grid max-md:grid-cols-3 max-md:grid-rows-2">
        <IconMenu2
          onClick={() => setOpenMobileMenu(true)}
          className="cursor-pointer md:hidden"
        />
        {content}
      </NavbarContent>
      <NavbarMenu className="top-0 z-40 h-screen bg-white">
        <div className="flex justify-end">
          <NavbarMenuToggle aria-label={"Close menu"} className="h-10" />
        </div>
        {menuContent}
      </NavbarMenu>
    </Navbar>
  );
};

export default HeaderBarWrapper;
