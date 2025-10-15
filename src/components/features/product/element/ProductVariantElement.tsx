"use client";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import ProductVariantButton from "../../productvariant/ProductVariantButton";

export default function ProductVariantElement({
  items,
  activeValue,
  onChangeVariant,
}: {
  items: ProductVariantJson[];
  activeValue: number;
  onChangeVariant: (item: ProductVariantJson) => void;
}) {
  return (
    <div>
      <div className="inline-block">
        {items.map((item) => {
          return (
            <ProductVariantButton
              key={item.id}
              item={item}
              isActive={activeValue === item.id}
              onClick={() => onChangeVariant(item)}
            />
          );
        })}
      </div>
    </div>
  );
}
