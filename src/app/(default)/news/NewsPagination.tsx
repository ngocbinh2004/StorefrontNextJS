"use client";
import { Pagination } from "@nextui-org/pagination";

import { useRouter } from "next/navigation";

const NewsPagination = ({
  total,
  current_page,
}: {
  total: number;
  current_page: number;
}) => {
  const limit = 10;
  const router = useRouter();

  const paginationCallback = (page: number) => {
    router.push(`news?page=${page}`);
  };

  return (
    <div>
      <Pagination
        showControls
        total={Math.ceil(total / limit)}
        page={current_page}
        className="my-6"
        onChange={paginationCallback}
      />
    </div>
  );
};

export default NewsPagination;
