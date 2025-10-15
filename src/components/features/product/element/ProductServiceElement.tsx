import PageBlockNextApi from "@/common/api/next/PageBlockNextApi";
import PageBlockModel from "@/common/models/PageBlockModel";
import { PageBlockJson } from "@/common/types/PageBlock";
import React, { useCallback, useEffect, useState } from "react";

const ProductServiceElement = () => {
  const [content, setContent] = useState<PageBlockJson>(
    PageBlockModel.getDefaultData(),
  );

  const fetchContent = useCallback(async () => {
    const item = await PageBlockNextApi.getDetailByIdentifier(
      `product-page-service-1`,
    );

    if (!item.hasError()) {
      setContent(item);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <div>
      <div className="flex flex-col w-full mt-3 overflow-hidden rounded-lg border-1 border-Accent_Color_1">
        <div
          className="flex items-center p-2 justify-star"
          style={{ background: "#3DAEA4" }}>
          <p className="mx-2 font-bold text-white text-14">{content.name}</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full p-2 bg-white">
          <div
            className="format-content"
            dangerouslySetInnerHTML={{
              __html: content.data.html ?? "",
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductServiceElement;
