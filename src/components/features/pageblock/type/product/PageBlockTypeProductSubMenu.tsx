"use client";

import { ListInputItem, ListInputItems } from "@/common/interfaces/ListInput";
import { useState } from "react";

const PageBlockTypeProductSubMenu = ({
  subMenuItems,
  onChange,
}: {
  subMenuItems: ListInputItems;
  onChange?: (item: ListInputItem) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState<ListInputItem | undefined>(
    undefined,
  );

  return (
    <>
      {subMenuItems.length > 0 ? (
        <div className="flex items-end justify-end p-2 gap-x-2 max-md:hidden">
          {subMenuItems.map((item) => {
            return (
              <div
                key={item.key}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedItem(item);
                  if (typeof selectedItem !== "undefined") {
                    onChange && onChange(item);
                  }
                }}>
                <p
                  className={`px-2 py-1 text-sm font-bold rounded-lg border-1 hover:border-primary hover:bg-primary hover:text-white ${
                    typeof selectedItem !== "undefined" &&
                    selectedItem.key === item.key
                      ? "border-primary bg-primary text-white "
                      : "border-gray-900"
                  }`}>
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default PageBlockTypeProductSubMenu;
