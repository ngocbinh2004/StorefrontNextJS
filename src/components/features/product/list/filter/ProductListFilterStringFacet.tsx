"use client";

import { Aggregation } from "@/common/types/Aggregation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { IconSquarePlus } from "@tabler/icons-react";

import { FilterStringFacet } from "@/common/types/Product";
import { useCallback, useMemo, useState } from "react";

const ProductListFilterStringFacet = ({
  agg,
  selectedFacets,
  setSelectedFacets,
}: {
  agg: Aggregation;
  selectedFacets: FilterStringFacet[];
  setSelectedFacets: (v: FilterStringFacet[]) => void;
}) => {
  const selectedValues = useMemo(() => {
    return selectedFacets.find((i) => i.name === agg.name)?.value || [];
  }, [agg.name, selectedFacets]);

  const onChangeSelection = useCallback(
    (keys: Selection) => {
      if (typeof keys !== "string") {
        const values = Array.from(keys).map((i) => i.toString());

        const foundIndex = selectedFacets.findIndex((i) => i.name === agg.name);
        if (foundIndex >= 0) {
          const newFacets = selectedFacets.map((i) =>
            i.name === agg.name ? { ...i, value: values } : i,
          );
          setSelectedFacets(newFacets);
        } else {
          //not found, append to list
          setSelectedFacets([
            ...selectedFacets,
            { name: agg.name, value: values },
          ]);
        }
      }
    },
    [agg.name, selectedFacets, setSelectedFacets],
  );

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <div className="p-1 border border-gray-300 rounded cursor-pointer hover:border-primary">
            <div className="flex items-center gap-1">
              <div className="text-sm">{agg.name}: </div>
              {selectedValues.length === 0 ? (
                <span className="text-sm text-gray-500">
                  <IconSquarePlus strokeWidth={1} size={18} />
                </span>
              ) : null}

              {selectedValues.map((item, index, items) => {
                return (
                  <span
                    key={item.toString()}
                    className={`text-xs text-primary`}>
                    {item.toString()}
                    {index < items.length - 1 ? ", " : null}
                  </span>
                );
              })}
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          closeOnSelect={true}
          selectionMode="multiple"
          selectedKeys={selectedValues}
          onSelectionChange={onChangeSelection}
          items={agg.buckets
            .filter((item) => item.name.length > 0)
            .map((item, i) => {
              return {
                key: item.name,
                label: item.name,
                count: item.count,
              };
            })}>
          {(item) => (
            <DropdownItem key={item.key} className="w-96 lg:w-full">
              {item.label}{" "}
              <span className="text-xs text-gray-400"> ({item.count})</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProductListFilterStringFacet;
