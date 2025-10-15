import React from "react";

const FormRequireIndicator = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <span className={`text-red-500 ${className}`}>{children || "*"}</span>;
};

export default FormRequireIndicator;
