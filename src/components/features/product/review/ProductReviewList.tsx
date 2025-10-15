import ProductCommentCollection from "@/common/collections/ProductCommentCollection";
import { ProductCommentJson } from "@/common/types/ProductComment";
import ButtonLike from "@/components/shared/displaydata/ButtonLike";
import TextDateTimeRelative from "@/components/shared/displaydata/TextDateTimeRelative";
import RatingStars from "@/components/shared/displaydata/rating/RatingStars";
import { Divider } from "@nextui-org/divider";

export default function ProductReviewList({
  collection,
}: {
  collection: ProductCommentCollection;
}) {
  return (
    <div className="divide-y-1">
      {collection.items.map((review) => (
        <ReviewProductListItem key={review.id} data={review.toJson()} />
      ))}
    </div>
  );
}

function ReviewProductListItem({ data }: { data: ProductCommentJson }) {
  return (
    <div className="py-4 space-y-2.5 text-sm">
      <b>{data.fullname}</b>
      <RatingStars rating={data.count_reply} size={12} />
      <p>{data.content}</p>
      <div className="flex gap-3">
        <ButtonLike value={0} />
        <Divider orientation="vertical" className="h-auto" />
        <p className="text-xs">
          Đã dùng <TextDateTimeRelative ts={data.date_created} />
        </p>
      </div>
    </div>
  );
}
