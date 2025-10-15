"use client"
import { cn } from "@/common/utils/cn"
import { Pagination as PaginationNextUI } from "@nextui-org/react"
import { useRouter, usePathname } from "next/navigation"

export default function Pagintion({
  page,
  limit,
  total,
  className
}: {
  page: number
  limit: number
  total: number
  className?: string
}) {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div className={cn("flex justify-center", className)}>
      <PaginationNextUI
        showControls
        total={total}
        page={page}
        onChange={(current) => {
          router.push(`${pathName}?page=${current}&limit=${limit}`)
        }}
        initialPage={1}
        className="my-6"
      />
    </div>
  )
}
