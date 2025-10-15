"use client";

import ProductRatingNextApi from "@/common/api/next/ProductRatingNextApi";
import ProductAvgRatingModel from "@/common/models/ProductAvgRatingModel";
import { ProductAvgRatingJson } from "@/common/types/ProductAvgRating";
import RatingStars from "@/components/shared/displaydata/rating/RatingStars";
import { useCallback, useEffect, useState } from "react";

const ProductCountRatingElement = ({ productId }: { productId: number }) => {
  const [avgRating, setAvgRating] = useState<ProductAvgRatingJson>(
    ProductAvgRatingModel.getDefaultData(),
  );
  const fetchData = useCallback(async () => {
    const productAvgRatingModel = await ProductRatingNextApi.getAvgRating(
      productId,
    );
    setAvgRating(productAvgRatingModel.toJson());
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <RatingStars rating={avgRating.avg_rating} />
      {/* <div className="w-px h-4 mx-1 bg-primary max-md:hidden"></div> */}
      <p className="ml-2 text-sm">
        <span className="font-bold text-primary">{avgRating.total_rating}</span>{" "}
        {"Đánh giá"}
      </p>
    </>
  );
};

export default ProductCountRatingElement;
