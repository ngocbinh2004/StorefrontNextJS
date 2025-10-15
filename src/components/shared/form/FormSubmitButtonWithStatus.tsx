"use client";

import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@nextui-org/button";

const FormSubmitButtonWithStatus = ({
  children,
  color,
  type,
  size,
  className,
}: {
  color?: ButtonProps["color"];
  type?: ButtonProps["type"];
  size?: ButtonProps["size"];
  className?: string;
  children: React.ReactNode;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      size={size}
      color={color || "primary"}
      className={className}
      type={type || "submit"}
      disabled={pending}
      isLoading={pending}
    >
      {children}
    </Button>
  );
};

export default FormSubmitButtonWithStatus;
