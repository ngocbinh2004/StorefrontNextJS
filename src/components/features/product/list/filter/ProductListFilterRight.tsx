"use client";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";

export default function ProductListFilterRight() {
  return (
    <div className="flex items-center gap-4">
      <Select
        labelPlacement="outside-left"
        defaultSelectedKeys={["1"]}
        label={"Sắp xếp:"}
        items={[
          { label: "Phổ biến nhất", value: 1 },
          { label: "Đánh giá tốt nhất", value: 2 },
          { label: "Mới nhất", value: 3 },
          { label: "Giá từ cao đến thấp", value: 4 },
          { label: "Giá từ thấp đến cao", value: 5 },
        ]}
        classNames={{
          selectorIcon: "static",
          label: "w-20",
          trigger: "flex-1",
        }}
      >
        {(item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        )}
      </Select>

      <Divider orientation="vertical" className="h-10 max-md:hidden" />

      <Select
        labelPlacement="outside-left"
        label="Hiển thị:"
        defaultSelectedKeys={["1"]}
        items={[
          { label: "16 sản phẩm", value: 1 },
          { label: "32 sản phẩm", value: 2 },
          { label: "48 sản phẩm", value: 3 },
          { label: "64 sản phẩm", value: 4 },
        ]}
        placeholder="Select an item..."
        classNames={{
          base: "max-md:hidden",
          selectorIcon: "static",
          label: "w-16",
          trigger: "flex-1",
        }}
      >
        {(item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
