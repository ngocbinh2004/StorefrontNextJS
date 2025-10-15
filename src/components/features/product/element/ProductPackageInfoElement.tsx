import { ProductJson } from "@/common/types/Product";
import { IconShieldCheckFilled } from "@tabler/icons-react";
import React from "react";

const ProductPackageInfoElement = ({ product }: { product: ProductJson }) => {
  return (
    <>
      {product.info_package.length > 3 || product.info_warranty.length > 3 ? (
        <div className="border border-[#FFDFE1] rounded-[5px]">
          <div className="flex items-center bg-[#FFDFE1] p-1.5">
            <IconShieldCheckFilled size={25} />
            <p className="ml-1 font-bold text-primary">Thông tin sản phẩm</p>
          </div>
          <div className="p-3">
            <div
              className="format-content"
              dangerouslySetInnerHTML={{ __html: product.info_package }}></div>
            <div
              className="format-content"
              dangerouslySetInnerHTML={{ __html: product.info_warranty }}></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductPackageInfoElement;
