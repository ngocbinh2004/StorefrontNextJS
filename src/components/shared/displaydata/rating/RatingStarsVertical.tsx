"use client";
import ProductRatingNextApi from "@/common/api/next/ProductRatingNextApi";
import ProductAvgRatingModel from "@/common/models/ProductAvgRatingModel";
import { ProductAvgRatingJson } from "@/common/types/ProductAvgRating";
import { Progress } from "@nextui-org/progress";
import { IconStarFilled } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import RatingStars from "./RatingStars";

export default function RatingStarsVertical({
  productId,
}: {
  productId: number;
}) {
  const [avgRating, setAvgRating] = useState<ProductAvgRatingJson>(
    ProductAvgRatingModel.getDefaultData()
  );
  const fetchData = useCallback(async (productId: number) => {
    const productAvgRatingModel = await ProductRatingNextApi.getAvgRating(
      productId
    );
    setAvgRating(productAvgRatingModel.toJson());
  }, []);

  useEffect(() => {
    fetchData(productId);
  }, [fetchData, productId]);

  const renderRatingItem = (rating: number) => (
    <div className="flex justify-start items-center w-full" key={rating}>
      <p className="w-4 text-center">{avgRating.details[rating]}</p>
      <div className="ml-2 mr-4">
        <IconStarFilled size={14} className="text-[#F2994A]" />
      </div>
      <div className="w-9/12">
        <Progress
          value={(avgRating.details[rating] / avgRating.total_rating) * 100}
          classNames={{
            indicator: "bg-[#F2994A]",
          }}
        />
      </div>
      <div className="ml-4 w-10">
        {avgRating.details[rating] > 0 ? (
          <p>{(avgRating.details[rating] / avgRating.total_rating) * 100}%</p>
        ) : (
          <>{"0%"}</>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 flex justify-center items-center">
          <div>
            <RatingStars
              rating={avgRating.avg_rating}
              size={18}
              showNumber
              className="max-md:flex-col"
            />
            <p className="my-2 text-center text-[#2F6BFF]">
              {`${avgRating.total_rating} người đánh giá`}
            </p>
          </div>
        </div>
        <div className="col-span-3">
          {[5, 4, 3, 2, 1].map((rating) => renderRatingItem(rating))}
        </div>
      </div>
    </>
  );
}
