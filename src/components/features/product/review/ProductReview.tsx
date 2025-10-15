import ProductCommentApi from "@/common/api/server/ProductCommentApi";
import { ProductJson } from "@/common/types/Product";
import { cn } from "@/common/utils/cn";
import RatingStars from "@/components/shared/displaydata/rating/RatingStars";
import { Button } from "@nextui-org/button";
import ProductReviewFormModal from "./ProductReviewFormModal";
import ProductReviewList from "./ProductReviewList";

export default async function ProductReview({
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
    <div className={cn("flex flex-col gap-2 rounded-lg bg-white mt-16")}>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <div className="px-6 py-4 border rounded">
        <div className="grid grid-cols-5 gap-4">
          <div className="flex items-center justify-center col-span-2">
            <div>
              <RatingStars
                rating={product.avg_rating}
                size={18}
                showNumber
                className="max-md:flex-col"
              />
              <p className="my-2 text-center text-[#2F6BFF]">
                {`${commentCollection.total} người đánh giá`}
              </p>
            </div>
          </div>
          <div className="col-span-3">{/* <RatingStarsVertical /> */}</div>
        </div>

        <ProductReviewList collection={commentCollection} />

        <div className="flex gap-3 mt-4">
          <Button
            variant="bordered"
            className="flex items-center flex-1 cursor-pointer">
            {`Xem ${commentCollection.total} đánh giá`}
          </Button>
          <ProductReviewFormModal className="flex items-center flex-1 cursor-pointer">
            Viết đánh giá
          </ProductReviewFormModal>
        </div>
      </div>
    </div>
  );
}
