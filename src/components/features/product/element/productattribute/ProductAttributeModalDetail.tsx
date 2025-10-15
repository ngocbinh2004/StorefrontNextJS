import { AttributeJson } from "@/common/types/Attribute";
import { AttributeGroupJson } from "@/common/types/AttributeGroup";
import {
  ProductAttributeOverrideJson,
  ProductJson,
} from "@/common/types/Product";
import { ProductCategoryJson } from "@/common/types/ProductCategory";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useCallback } from "react";
import ProductAttributeDetail from "./ProductAttributeDetail";

const ProductAttributeModalDetail = ({
  myCategory,
  product,
  isOpen,
  onClose,
  onOpenChange,
}: {
  myCategory: ProductCategoryJson;
  product: ProductJson;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) => {
  const filterAttributeList = useCallback(
    (attrGroupId: number) => {
      let newAttrItems: AttributeJson[] = [];
      let newAttrOverride: ProductAttributeOverrideJson[] = [];

      const attributeList = myCategory.attribute?.filter(
        (i) => i.attribute_group_id === attrGroupId,
      );
      if (attributeList && attributeList.length > 0) {
        for (let i = 0; i < attributeList.length; i++) {
          let attr = attributeList[i];
          let findValue: ProductAttributeOverrideJson | undefined =
            product.attribute_detail.find((i) => i.id === attr.id);

          if (
            typeof findValue !== "undefined" &&
            findValue.id > 0 &&
            findValue.value !== ""
          ) {
            newAttrItems.push(attr);
            newAttrOverride.push(findValue);
          }
        }
      }

      return {
        attributeItems: newAttrItems,
        attributeOverrideItems: newAttrOverride,
      };
    },
    [myCategory, product],
  );

  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      scrollBehavior="inside">
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Thông số kĩ thuật
            </ModalHeader>
            <ModalBody>
              {Array.isArray(myCategory.attribute_group) &&
                myCategory.attribute_group.map((group: AttributeGroupJson) => {
                  return (
                    <ProductAttributeDetail
                      key={"detail-" + group.id}
                      attributeGroup={group}
                      attributeItems={
                        filterAttributeList(group.id).attributeItems
                      }
                      attributeOverrideItems={
                        filterAttributeList(group.id).attributeOverrideItems
                      }
                    />
                  );
                })}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductAttributeModalDetail;
