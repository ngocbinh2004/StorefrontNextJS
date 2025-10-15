import ProductApi from "@/common/api/server/ProductApi";
import { IconBuildingStore, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import FooterMobileMenuSearchModal from "./FooterMobileMenuSearchModal";
import FooterMobileMenuToggleNavigation from "./FooterMobileMenuToggleNavigation";

export default async function FooterMobileMenu() {
  return (
    <div className="lg:hidden fixed bottom-0 z-50 w-full shadow-[0_-2px_10px_rgba(0,0,0,.1)] border-t bg-white">
      <div className="container">
        <nav className="">
          <ul className="grid grid-cols-4 text-gray-400 items-center h-14 uppercase">
            <li>
              <Link
                href="/shop/"
                className="flex flex-col justify-center items-center text-[9px] gap-1"
              >
                <IconBuildingStore size={24} />
                <span>Trang chủ</span>
              </Link>
            </li>

            <li>
              <FooterMobileMenuSearchModal />
            </li>

            <li>
              <Link
                href="/account/"
                className="flex flex-col justify-center items-center text-[9px] gap-1"
              >
                <IconUser />
                <span>Tài khoản</span>
              </Link>
            </li>

            <li className="menu-item">
              <FooterMobileMenuToggleNavigation />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
