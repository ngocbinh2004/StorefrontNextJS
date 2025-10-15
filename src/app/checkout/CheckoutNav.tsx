import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const CheckoutNav = () => {
  const pages = [
    { name: "Giỏ hàng", href: "/shopping-cart", current: false },
    { name: "Đặt hàng & Thanh toán", href: "#", current: true },
  ];

  return (
    <nav className="flex mt-4 mb-8" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center">
              {index > 0 ? (
                <IconChevronRight
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              ) : null}

              <Link
                href={page.href}
                className={`${index > 0 ? "ml-2" : ""} text-xs ${
                  page.current
                    ? " font-bold text-gray-800"
                    : " text-gray-500 hover:text-primary"
                }`}
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutNav;
