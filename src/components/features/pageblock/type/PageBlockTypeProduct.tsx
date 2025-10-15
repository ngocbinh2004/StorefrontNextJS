import ProductApi from "@/common/api/server/ProductApi";
import { PageBlockJson } from "@/common/types/PageBlock";
import { ProductCardJson } from "@/common/types/ProductCard";
import PageBlockTypeBanner from "./PageBlockTypeBanner";
import PageBlockTypeProductList from "./product/PageBlockTypeProductList";

const PageBlockTypeProduct = async ({
  blockItem,
}: {
  blockItem: PageBlockJson;
}) => {
  let listItems = blockItem.data.items ?? [];

  let productCardItems: ProductCardJson[] = [];
  if (blockItem.data.product_id_list && blockItem.data.product_id_list !== "") {
    const collection = await ProductApi.getByIdList(
      blockItem.data.product_id_list
    );
    if (!collection.hasError()) {
      productCardItems = collection.items.map((i) => i.toJson());
    }
  }

  return (
    <div className="space-y-4">
      <PageBlockTypeBanner blockItem={blockItem} />

      {productCardItems.length > 0 ? (
        <PageBlockTypeProductList
          listItems={listItems}
          productCardItems={productCardItems}
        ></PageBlockTypeProductList>
      ) : null}
    </div>
  );
};

export default PageBlockTypeProduct;
