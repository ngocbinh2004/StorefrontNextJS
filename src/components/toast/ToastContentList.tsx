"use client";
import i18n from "@/common/hooks/i18n/client";
import React, { FC } from "react";

export interface ToastContentListProps {
  title?: React.ReactNode;
  items?: string[];
  className?: string;
  translate_prefix?: string;
}

const ToastContentList: FC<ToastContentListProps> = ({
  title,
  items,
  className,
  translate_prefix,
}) => {
  return (
    <div className={className}>
      {typeof title !== "undefined" && (
        <h3 className=" font-bold text-red-800">{title}</h3>
      )}

      <div className="text-sm text-red-700">
        {Array.isArray(items) && items.length > 0 ? (
          <ul
            role="list"
            className={
              "" + (items?.length === 1 ? "" : " list-disc space-y-1 pl-5 ")
            }
          >
            {items.map((item, id) => (
              <li key={id}>
                {typeof translate_prefix !== "undefined" &&
                translate_prefix.length > 0 &&
                !item.includes(" ")
                  ? i18n.t(translate_prefix + "." + item)
                  : item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ToastContentList;
