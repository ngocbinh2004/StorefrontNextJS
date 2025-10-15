"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
import React, { FC } from "react";
import i18n from "@/common/hooks/i18n/client";

export interface AlertErrorProps {
  title?: React.ReactNode;
  items?: string[];
  className?: string;
  translate_prefix?: string;
}

const AlertError: FC<AlertErrorProps> = ({
  title,
  items,
  className,
  translate_prefix,
}) => {
  return (
    <div className={className}>
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <IconAlertTriangle
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            {typeof title !== "undefined" && (
              <h3 className="mb-2 text-sm font-medium text-red-800">{title}</h3>
            )}

            <div className="text-sm text-red-700">
              {Array.isArray(items) && items.length > 0 ? (
                <ul
                  role="list"
                  className={
                    "" +
                    (items?.length === 1 ? "" : " list-disc space-y-1 pl-5 ")
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
        </div>
      </div>
    </div>
  );
};

export default AlertError;
