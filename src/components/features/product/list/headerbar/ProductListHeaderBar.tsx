import React from "react";

const ProductListHeaderBar = ({
  heading,
  total,
}: {
  heading: React.ReactNode;
  total: number;
}) => {
  return (
    <>
      <h1 className={`text-2xl font-bold`}>{heading}</h1>
      <span className="text-sm text-gray-500">
        {total === 0 ? (
          <>Không tìm thấy sản phẩm nào.</>
        ) : (
          <>Tìm thấy {total} sản phẩm.</>
        )}
      </span>
    </>
  );
};

export default ProductListHeaderBar;
