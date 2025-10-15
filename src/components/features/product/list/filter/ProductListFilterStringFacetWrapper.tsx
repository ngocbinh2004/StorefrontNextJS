"use client";

import { Aggregation } from "@/common/types/Aggregation";
import { useCallback, useMemo, useState } from "react";
import ProductListFilterStringFacet from "./ProductListFilterStringFacet";
import { Button } from "@nextui-org/react";
import UrlUtil from "@/common/utils/url";
import { useRouter, useSearchParams } from "next/navigation";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import { FilterStringFacet } from "@/common/types/Product";

export default function ProductListFilterStringFacetWrapper({
  aggsStringFacet,
  selectedFacets,
  setSelectedFacets,
  doSearchWithStringFacet,
}: {
  aggsStringFacet?: Aggregation[];
  selectedFacets: FilterStringFacet[];
  setSelectedFacets: (v: FilterStringFacet[]) => void;
  doSearchWithStringFacet: () => void;
}) {
  const router = useRouter();
  const hasAggs = useMemo(() => {
    return !Array.isArray(aggsStringFacet) || aggsStringFacet.length > 0;
  }, [aggsStringFacet]);

  const [isOpen, setIsOpen] = useState(true);

  const resetFilterStringFacet = useCallback(() => {
    setSelectedFacets([]);
    router.refresh();
  }, [router, setSelectedFacets]);

  return (
    <>
      {hasAggs && aggsStringFacet !== undefined ? (
        <div className="bg-white rounded-md p-2">
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <>
                <h3 className="font-bold text-sm hover:text-primary">
                  Lọc theo Thông số kỹ thuật{" "}
                  <IconCaretUpFilled
                    size={16}
                    className="inline-block -mt-0.5"
                  />
                </h3>
              </>
            ) : (
              <>
                <h3 className="text-sm text-primary">
                  Lọc theo Thông số kỹ thuật{" "}
                  <IconCaretDownFilled
                    size={16}
                    className="inline-block -mt-0.5"
                  />
                </h3>
              </>
            )}
          </div>

          <div className={`space-y-2 ${isOpen ? "" : "hidden"}`}>
            {aggsStringFacet.map((agg) => {
              return (
                <div key={agg.name} className="inline-block mr-2">
                  <ProductListFilterStringFacet
                    agg={agg}
                    selectedFacets={selectedFacets}
                    setSelectedFacets={setSelectedFacets}
                  />
                </div>
              );
            })}
            <div className="inline-block space-x-2">
              <Button
                size="sm"
                variant="light"
                onClick={() => resetFilterStringFacet()}
              >
                Bỏ lọc
              </Button>
              <Button
                size="sm"
                color="primary"
                onClick={() => doSearchWithStringFacet()}
              >
                Lọc
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
