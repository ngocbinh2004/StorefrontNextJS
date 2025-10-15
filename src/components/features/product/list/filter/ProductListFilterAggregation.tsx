import { cn } from "@/common/utils/cn";
import { Checkbox } from "@nextui-org/checkbox";

const items = [
  "Phone Accessories",
  "Phone Cases",
  "Postpaid Phones",
  "Prepaid Phones",
  "Prepaid Plans",
  "Refurbished Phones",
  "Samsung Galaxy",
  "Straight Talk",
  "Unlocked Phones",
];
export default function ProductListFilterAggregation({
  title,
  columns = 1,
}: {
  title: string;
  columns?: 1 | 2;
}) {
  return (
    <div>
      <h2 className="text-[0.9375rem] mt-2 mb-4 font-bold">{title}</h2>
      <div
        className={cn(
          "grid gap-y-3 gap-x-2",
          columns === 1 ? "grid-cols-1" : "grid-cols-2"
        )}
      >
        {items.map((item, i) => (
          <Checkbox key={i} size="sm" classNames={{ label: "text-sm" }}>
            {item}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
