"use client"

import {
  IconHeart,
  IconMessageCircle
} from "@tabler/icons-react"
import Image from "next/image"
import { useState } from "react"
import CommentForm from "./CommentForm"
import CommentImageList from "./CommentImageList"

export default function CommentListItem() {
  const [showCmtForm, setShowCmt] = useState(false)

  const username = <p className="text-primary font-bold">Hun Ter</p>

  return (
    <div className="flex flex-col py-2">
      <div className="flex items-center">
        <div>
          <Image src="/images/product/avatar.png" width={32} height={32} alt="avatar" />
        </div>
        <div className="items-start justify-start pl-3 w-11/12">
          <div className="flex items-center gap-2">
            {username}
            <p className="text-slate-400 text-sm">10 giờ trước</p>
            {/* <TextDateTimeRelative ts={1695200000} className="text-slate-400 text-sm" /> */}
          </div>
        </div>
      </div>
      <div className="ml-12">
        <div className="mb-1">
          <span className="">ok</span>
        </div>
        <CommentImageList />
        <div className="flex gap-3 mt-1">
          <div
            className="flex items-center cursor-pointer gap-1"
            onClick={() => setShowCmt((prev) => !prev)}
          >
            <IconMessageCircle size={14} />
            <p className="text-sm">trả lời</p>
          </div>
          <div
            className="flex items-center cursor-pointer gap-1"
            onClick={() => setShowCmt((prev) => !prev)}
          >
            <IconHeart size={14} />
            <p className="text-sm">83</p>
          </div>
        </div>
      </div>
      {showCmtForm && <CommentForm />}
    </div>
  )
}
