import { IconCircleCheck } from "@tabler/icons-react";
import React, { FC } from "react";

export interface AlertSuccessProps {
  className?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}

const AlertSuccess: FC<AlertSuccessProps> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={`rounded-md bg-green-50 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconCircleCheck
            className="h-5 w-5 text-green-600"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-medium text-green-600">{title}</h3>
          {typeof children !== "undefined" ? (
            <div className="mt-2 text-sm text-green-900">{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
