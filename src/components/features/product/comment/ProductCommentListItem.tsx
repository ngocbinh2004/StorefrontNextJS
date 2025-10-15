"use client";

import { ProductCommentJson } from "@/common/types/ProductComment";
import TextDateTime from "@/components/shared/displaydata/TextDateTime";
import Image from "next/image";
import { useState } from "react";
import CommentForm from "./CommentForm";

export default function ProductCommentListItem({
  comment,
}: {
  comment: ProductCommentJson;
}) {
  const [showCmtForm, setShowCmt] = useState(false);

  return (
    <div className="flex flex-col py-2">
      <div className="flex items-center">
        <div>
          <Image
            src="/images/product/avatar.png"
            width={32}
            height={32}
            alt={comment.fullname}
          />
        </div>
        <div className="items-start justify-start w-11/12 pl-3">
          <div className="flex items-center gap-2">
            <p className="font-bold text-primary">{comment.fullname}</p>
            <div className="text-sm text-slate-400">
              <TextDateTime ts={comment.date_created} />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-12">
        <div className="mb-1">
          <span className="">{comment.content}</span>
        </div>
      </div>
      {showCmtForm && <CommentForm />}
    </div>
  );
}
