import { ProductCommentReplyJson } from "@/common/types/ProductCommentReply";
import ProductCommentReplyListItem from "./ProductCommentReplyListItem";

export default function ProductCommentReplyList({
  replyList,
}: {
  replyList: ProductCommentReplyJson[];
}) {
  return (
    <div className="ml-11">
      {replyList.map((item) => (
        <ProductCommentReplyListItem reply={item} key={item.id} />
      ))}
    </div>
  );
}
