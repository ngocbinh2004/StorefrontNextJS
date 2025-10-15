import ProductCommentApi from "@/common/api/server/ProductCommentApi";
import { ProductJson } from "@/common/types/Product";
import ProductCommentForm from "./ProductCommentForm";
import ProductCommentList from "./ProductCommentList";

export default async function ProductComment({
  product,
}: {
  product: ProductJson;
}) {
  let page = 1;

  const commentCollection = await ProductCommentApi.getItems({
    page: page,
    limit: 20,
    sortby: "id",
    sorttype: "ASC",
    product_id: product.id,
  });

  return (
    <div className="flex flex-col p-2 bg-white border rounded-md mt-11">
      <h2 className="px-3 mb-2 text-xl font-bold">Bình luận & hỏi đáp</h2>
      <ProductCommentForm product={product} />
      <ProductCommentList
        productCommentItems={commentCollection.items.map((i) => i.toJson())}
      />
    </div>
  );
}
