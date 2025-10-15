import { PageBlockJson } from "@/common/types/PageBlock";
import { cn } from "@/common/utils/cn";
import Helper from "@/common/utils/helper";
import PageBlockTypeGridCol from "./grid/PageBlockTypeGridCol";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

const PageBlockTypeTextGrid = ({ blockItem }: { blockItem: PageBlockJson }) => {
  let itemColumn = blockItem.data.item_column ?? 0;

  let gridCols = ``;
  switch (itemColumn) {
    case 1:
      gridCols = "grid grid-cols-1";
      break;
    case 2:
      gridCols = "grid gap-8 grid-cols-2";
      break;
    case 3:
      gridCols = "grid gap-8 grid-cols-3";
      break;
    case 4:
      gridCols = "grid gap-8 grid-cols-4";
      break;
    case 5:
      gridCols = "grid gap-8 grid-cols-5";
      break;
    case 6:
      gridCols = "grid gap-8 grid-cols-6";
      break;
    case 7:
      gridCols = "grid gap-8 grid-cols-7";
      break;
    case 8:
      gridCols = "grid gap-8 grid-cols-8";
      break;
    case 9:
      gridCols = "grid gap-8 grid-cols-9";
      break;
    case 10:
      gridCols = "grid gap-8 grid-cols-10";
      break;
    case 11:
      gridCols = "grid gap-8 grid-cols-11";
      break;
    case 12:
      gridCols = "grid gap-8 grid-cols-12";
      break;
  }

  return (
    <>
      <PageBlockTypeGridCol blockItem={blockItem} gridCols={gridCols} />
    </>
  );
};

export default PageBlockTypeTextGrid;
