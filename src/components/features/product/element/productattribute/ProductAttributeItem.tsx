import { AttributeJson } from "@/common/types/Attribute";
import { ProductAttributeOverrideJson } from "@/common/types/Product";
import { useMemo } from "react";

const ProductAttributeItem = ({
  attributeItem,
  keyItem,
  attributeOverrideItems,
}: {
  attributeItem: AttributeJson;
  keyItem: number;
  attributeOverrideItems: ProductAttributeOverrideJson[];
}) => {
  const findAttributeOverrideItemVale = useMemo(() => {
    let value = "";
    for (let i = 0; i < attributeOverrideItems.length; i++) {
      const item = attributeOverrideItems[i];
      if (item.id === attributeItem.id) {
        value = item.value;
      }
    }
    return value;
  }, [attributeOverrideItems, attributeItem]);

  return (
    <div className="text-sm">
      <div className="flex flex-col items-start justify-start">
        <div
          className={`flex justify-between items-start p-2.5 w-full rounded-md
          ${keyItem % 2 === 0 ? `even:bg-white` : `odd:bg-gray-100`}`}>
          <div className="w-2/5">
            <div
              className="text-left"
              dangerouslySetInnerHTML={{
                __html: attributeItem.name,
              }}></div>
          </div>
          <div className="w-3/5">
            <div
              dangerouslySetInnerHTML={{
                __html: findAttributeOverrideItemVale,
              }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAttributeItem;
