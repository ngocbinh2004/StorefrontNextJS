import { AttributeJson } from "@/common/types/Attribute";
import { AttributeGroupJson } from "@/common/types/AttributeGroup";
import { ProductAttributeOverrideJson } from "@/common/types/Product";
import { useMemo } from "react";

const ProductAttributeDetail = ({
  attributeGroup,
  attributeItems,
  attributeOverrideItems,
}: {
  attributeGroup: AttributeGroupJson;
  attributeItems: AttributeJson[] | undefined;
  attributeOverrideItems: ProductAttributeOverrideJson[];
}) => {
  const groupHasAttributeAndValue = useMemo(() => {
    let pass = false;
    if (attributeItems && attributeItems.length > 0) {
      let filterAttributeList = attributeItems
        .map((attr) => {
          return attributeOverrideItems.find((i) => i.id === attr.id);
        })
        .filter((i) => i !== undefined);
      if (filterAttributeList.length > 0) {
        pass = true;
      }
    }
    return pass;
  }, [attributeItems, attributeOverrideItems]);

  return groupHasAttributeAndValue ? (
    <div className="w-full">
      <div
        className="mb-2 text-lg font-bold"
        dangerouslySetInnerHTML={{ __html: attributeGroup.name }}></div>
      <div className="text-sm border-2 rounded-md">
        {attributeItems && attributeItems.length > 0
          ? attributeItems.map((attribute) => {
              let findValue: ProductAttributeOverrideJson | undefined =
                attributeOverrideItems.find((i) => i.id === attribute.id);
              return findValue !== undefined ? (
                <div
                  key={attribute.id}
                  className={`flex justify-between items-start p-2.5 w-full even:bg-white odd:bg-gray-100 bg-opacity-0`}>
                  <div className="w-2/5">
                    <div
                      className="text-left"
                      dangerouslySetInnerHTML={{
                        __html: attribute.name,
                      }}></div>
                  </div>
                  <div className="w-3/5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: findValue.value,
                      }}></div>
                  </div>
                </div>
              ) : null;
            })
          : null}
      </div>
    </div>
  ) : null;
};

export default ProductAttributeDetail;
