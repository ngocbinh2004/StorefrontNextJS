import ButtonLike from "@/components/shared/displaydata/ButtonLike"
import TextDateTimeRelative from "@/components/shared/displaydata/TextDateTimeRelative"
import RatingStars from "@/components/shared/displaydata/rating/RatingStars"
import { Divider } from "@nextui-org/divider"

const reviewList = [
  {
    id: 1,
    name: "Hồ minh phúc",
    rating: 5,
    feedback: "hàng ngon",
    like: 2,
    boughtDate: 1695200000,
  },
  {
    id: 2,
    name: "Hồ minh phúc",
    rating: 5,
    feedback: "hàng ngon",
    like: 0,
    boughtDate: 1695200000,
  },
]

export default function ReviewList() {
  return (
    <div className="divide-y-1">
      {reviewList.map((review) => (
        <ReviewListItem key={review.id} data={review} />
      ))}
    </div>
  )
}

function ReviewListItem({ data }: { data: (typeof reviewList)[0] }) {
  return (
    <div className="py-4 space-y-2.5 text-sm">
      <b>{data.name}</b>
      <RatingStars rating={data.rating} size={12} />
      <p>{data.feedback}</p>
      <div className="flex gap-3">
        <ButtonLike value={data.like} />
        <Divider orientation="vertical" className="h-auto" />
        <p className="text-xs">Đã dùng <TextDateTimeRelative ts={data.boughtDate} /></p>
      </div>
    </div>
  )
}
