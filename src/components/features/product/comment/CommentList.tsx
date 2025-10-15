"use client"
import { Pagination } from "@nextui-org/pagination"
import CommentListItem from "./CommentListItem"
import CommentSubList from "./CommentSubList"

export default function CommentList() {
  return (
    <div>
      {Array.from({ length: 2 }, (_, i) => i).map((i) => (
        <div key={i}>
          <CommentListItem />
          <CommentSubList />
        </div>
      ))}
      <Pagination
        disableCursorAnimation
        showControls
        classNames={{
          wrapper:
            "m-auto data-[active=true]:[&_li]:text-primary data-[active=true]:[&_li]:bg-transparent data-[active=true]:[&_li]:font-bold",
          next: 'text-primary',
          prev: 'text-primary'
        }}
        variant="light"
        {...{ page: 1, limit: 3, total: 14 }}
      />
    </div>
  )
}
