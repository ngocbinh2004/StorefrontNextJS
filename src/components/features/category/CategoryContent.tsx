import CollapsibleBlock from "@/components/shared/displaydata/CollapsibleBlock";
import React from "react";

const CategoryContent = ({ content }: { content: string }) => {
  return (
    <CollapsibleBlock className="p-2 mt-2">
      <div className="max-w-[920px] mx-auto py-2">
        <div className="relative text-justify">
          <div
            className="overflow-hidden category-format-content"
            dangerouslySetInnerHTML={{
              __html: content.replace(/_quot/g, ""),
            }}></div>
        </div>
      </div>
    </CollapsibleBlock>
  );
};

export default CategoryContent;
