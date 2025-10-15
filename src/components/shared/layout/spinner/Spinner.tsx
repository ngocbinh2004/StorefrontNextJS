import { Spinner } from "@nextui-org/react";

const LayoutSpinner = ({
  className,
  label,
  color,
}: {
  className?: string;
  label?: string;
  color?:
    | "current"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "white"
    | undefined;
}) => {
  return (
    <Spinner
      className={className ?? ""}
      label={label ?? "Đang lấy dữ liệu, vui lòng đợi trong ít phút..."}
      color={color ?? "warning"}
    />
  );
};

export default LayoutSpinner;
