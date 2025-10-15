import PageBlockApi from "@/common/api/server/PageBlockApi";
import { PageBlockJson } from "@/common/types/PageBlock";
import PageBlockWrapper from "../../pageblock/PageBlockWrapper";

const LandingPageBlock = async ({ pageId }: { pageId: number }) => {
  let blockItems: PageBlockJson[] = [];

  if (pageId > 0) {
    const collection = await PageBlockApi.getPageBlockByPageId(pageId);
    if (!collection.hasError()) {
      blockItems = collection.items.map((i) => i.toJson());
    }
  }

  return (
    <div className="">
      {blockItems.length > 0
        ? blockItems.map((i) => (
            <div key={i.id} className="mb-8">
              <PageBlockWrapper blockItem={i} />
            </div>
          ))
        : null}
    </div>
  );
};

export default LandingPageBlock;
