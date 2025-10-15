import { NewsCollectionJson } from "@/common/types/News";
import NewsListItem from "./NewsListItem";
const NewsList = ({ collection }: { collection: NewsCollectionJson }) => {
  return (
    <div>
      {collection.items.map((item) => (
        <NewsListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default NewsList;
