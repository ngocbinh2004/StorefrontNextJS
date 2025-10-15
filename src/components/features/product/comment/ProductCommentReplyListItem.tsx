"use client";

import { ProductCommentReplyJson } from "@/common/types/ProductCommentReply";
import TextDateTime from "@/components/shared/displaydata/TextDateTime";
import Image from "next/image";

export default function ProductCommentReplyListItem({
  reply,
}: {
  reply: ProductCommentReplyJson;
}) {
  return (
    <div className="flex flex-col py-2">
      <div className="flex items-center">
        <div>
          <Image
            src="/images/product/avatar.png"
            width={32}
            height={32}
            alt={reply.fullname}
          />
        </div>
        <div className="items-start justify-start pl-3 w-11/12">
          <div className="flex items-center gap-2">
            <p className="text-primary font-bold">{reply.fullname}</p>
            <p className="text-slate-400 text-sm">
              <TextDateTime ts={reply.date_created} />
            </p>
          </div>
        </div>
      </div>
      <div className="ml-12">
        <span className="">{reply.content}</span>
      </div>
    </div>
  );
}
