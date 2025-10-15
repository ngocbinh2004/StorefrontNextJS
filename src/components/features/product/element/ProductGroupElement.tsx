"use client";
import { ProductGroupJson } from "@/common/types/Product";
import { Button } from "@nextui-org/button";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ProductGroupElement({
  items,
  activeValue,
  category_slug,
}: {
  items: ProductGroupJson[];
  activeValue: number;
  category_slug: string;
}) {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2 max-md:grid-cols-3 max-md:gap-2 max-md:gap-y-1 py-0.5">
        {items?.map((item) => {
          const isActive = activeValue === item.product_id;
          return (
            <Button
              key={item.product_id}
              variant="bordered"
              color={isActive ? "primary" : "default"}
              className="h-9"
              onClick={() => {
                router.push(`/${category_slug}/${item.seo_url}.html`);
              }}>
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
