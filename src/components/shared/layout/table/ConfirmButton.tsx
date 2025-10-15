import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { IconTrash } from "@tabler/icons-react";

const ConfirmButton = ({
  onConfirm,
  children,
  title,
  labelYes,
  labelNo,
}: {
  onConfirm: () => void;
  children?: React.ReactNode;
  title?: React.ReactNode;
  labelYes?: React.ReactNode;
  labelNo?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom"
      showArrow={true}
      shouldCloseOnBlur={true}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        {children || (
          <Button isIconOnly size="sm" variant="light">
            <IconTrash className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2">
          <div className="mb-2 font-semibold">
            {title || "Bạn có muốn xoá?"}
          </div>
          <div className="space-x-3">
            <Button size="sm" variant="light" onClick={() => setIsOpen(false)}>
              {labelNo || "Không"}
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
              size="sm"
              color="primary"
              variant="ghost"
            >
              {labelYes || "Có"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmButton;
