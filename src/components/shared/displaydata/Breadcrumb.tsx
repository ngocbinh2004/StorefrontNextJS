import { BreadcrumbItem } from "@/common/types/Breadcrumb";
import { cn } from "@/common/utils/cn";
import Link from "next/link";

type BreadcrumbProps = {
  data: BreadcrumbItem[];
};

export default function Breadcrumb({ data }: BreadcrumbProps) {
  if (data.length < 2) return null;

  return (
    <div className="container">
      <ul
        className={
          "flex text-sm my-4 max-md:text-xs md:whitespace-normal overflow-x-scroll"
        }
      >
        {data.map((item, index) => {
          if (index === data.length - 1) {
            return (
              <li key={index}>
                <span className="text-xs text-gray-800">{item.label}</span>
              </li>
            );
          }

          return (
            <li key={index}>
              <Link href={item.href} className="">
                {item.label}
              </Link>
              {index !== data.length - 1 && (
                <span className="mx-1 text-gray-800">/</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
