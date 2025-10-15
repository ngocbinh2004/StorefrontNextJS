import { ProductRatingJson } from "@/common/types/ProductRating";
import ProductRatingListItem from "./ProductRatingListItem";

export default function ProductRatingList({
  items,
}: {
  items: ProductRatingJson[];
}) {
  return (
    <div className="divide-y-1">
      {items.map((rating) => (
        <ProductRatingListItem key={rating.id} data={rating} />
      ))}
    </div>
  );
}
