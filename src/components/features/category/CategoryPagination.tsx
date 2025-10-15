import { PaginationParams } from "@/common/types/Page";
import { Pagination } from "@nextui-org/pagination";

const CategoryPagination = ({
  total,
  limit,
  currentpage,
}: PaginationParams) => {
  return (
    <div className="flex justify-center my-10 max-md:hidden">
      <Pagination
        showControls
        total={Math.ceil(total / limit)}
        page={currentpage}
      />
    </div>
  );
};

export default CategoryPagination;
