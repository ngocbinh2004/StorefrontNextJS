import ProductRatingApi from "@/common/api/server/ProductRatingApi";
import ProductRatingModel from "@/common/models/ProductRatingModel";
import { CustomerJson } from "@/common/types/Customer";
import { ProductJson } from "@/common/types/Product";
import { cn } from "@/common/utils/cn";
import RatingStarsVertical from "@/components/shared/displaydata/rating/RatingStarsVertical";
import { Button } from "@nextui-org/button";
import ProductRatingFormModal from "./ProductRatingFormModal";
import ProductRatingList from "./ProductRatingList";
import ProductRatingNoticeModal from "./ProductRatingNoticeModal";

export default async function ProductRating({
  product,
  loggedUser,
}: {
  product: ProductJson;
  loggedUser: CustomerJson;
}) {
  let page = 1;

  const ratingCollection = await ProductRatingApi.getItems({
    page: page,
    limit: 100,
    sortby: "id",
    sorttype: "ASC",
    product_id: product.id,
  });

  return (
    <div className={cn("flex flex-col gap-2 rounded-lg bg-white mt-16")}>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <div className="px-6 py-4 border rounded">
        <RatingStarsVertical productId={product.id} />
        <ProductRatingList
          items={ratingCollection.items.map((item: ProductRatingModel) =>
            item.toJson()
          )}
        />
        <div className="flex gap-3 mt-4">
          <Button
            variant="bordered"
            className="flex items-center flex-1 cursor-pointer"
          >
            {`Xem ${ratingCollection.total} đánh giá`}
          </Button>
          {loggedUser.id > 0 ? (
            <ProductRatingFormModal
              product={product}
              loggedUser={loggedUser}
              className="flex items-center flex-1 cursor-pointer"
            >
              Viết đánh giá
            </ProductRatingFormModal>
          ) : (
            <ProductRatingNoticeModal className="flex items-center flex-1 cursor-pointer">
              Viết đánh giá
            </ProductRatingNoticeModal>
          )}
        </div>
      </div>
    </div>
  );
}
