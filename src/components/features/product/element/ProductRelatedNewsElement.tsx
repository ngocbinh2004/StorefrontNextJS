import PageBlockNextApi from "@/common/api/next/PageBlockNextApi";
import PageBlockModel from "@/common/models/PageBlockModel";
import { PageBlockJson } from "@/common/types/PageBlock";
import { useCallback, useEffect, useState } from "react";
import PageBlockDisplayImage from "../../pageblock/PageBlockDisplayImage";

const ProductRelatedNewsElement = () => {
  const [blockItem, setBlockItem] = useState<PageBlockJson>(
    PageBlockModel.getDefaultData()
  );

  const fetchContent = useCallback(async () => {
    const item = await PageBlockNextApi.getDetailByIdentifier(`related_news`);

    if (!item.hasError()) {
      setBlockItem(item.toJson());
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return blockItem.id > 0 ? (
    <div>
      <h2 className="mb-4 text-xl font-bold max-md:mx-2">{blockItem.name}</h2>
      {typeof blockItem.data.items !== "undefined" &&
      blockItem.data.items.length > 0 ? (
        <ul className="grid grid-cols-1 p-4 gap-y-8">
          {blockItem.data.items.map((i) => {
            return (
              <li key={i.key} className="overflow-hidden">
                <div className="block w-full overflow-hidden rounded-lg">
                  <PageBlockDisplayImage
                    link={i.link !== "" ? i.link : "/"}
                    url={
                      i.photo.files.length > 0
                        ? i.photo.files[0].url
                        : "/assets/no-image.svg"
                    }
                    alt={i.description}
                    width={500}
                    height={201}
                  />
                </div>
                <p className="block mt-2 text-base font-bold text-gray-900 pointer-events-none">
                  {i.title}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  ) : null;
};

export default ProductRelatedNewsElement;
