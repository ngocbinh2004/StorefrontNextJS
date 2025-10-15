"use client";
import ProductRatingModel from "@/common/models/ProductRatingModel";
import { ProductRatingJson } from "@/common/types/ProductRating";
import ButtonLike from "@/components/shared/displaydata/ButtonLike";
import TextDateTimeRelative from "@/components/shared/displaydata/TextDateTimeRelative";
import RatingStars from "@/components/shared/displaydata/rating/RatingStars";
import { Divider } from "@nextui-org/react";

export default function ProductRatingListItem({
  data,
}: {
  data: ProductRatingJson;
}) {
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
