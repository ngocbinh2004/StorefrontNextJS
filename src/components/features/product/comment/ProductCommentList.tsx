"use client";
import { ProductCommentJson } from "@/common/types/ProductComment";
import ProductCommentListItem from "./ProductCommentListItem";
import ProductCommentReplyList from "./ProductCommentReplyList";

export default function ProductCommentList({
  productCommentItems,
}: {
  productCommentItems: ProductCommentJson[];
}) {
  return (
    <div>
      {productCommentItems.map((item: ProductCommentJson) => (
        <div key={item.id}>
          <ProductCommentListItem comment={item} />
          {item.reply_list.length > 0 ? (
            <ProductCommentReplyList replyList={item.reply_list} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
