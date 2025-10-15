import CommentListItem from './CommentListItem'

export default function CommentSubList() {
  return (
    <div className='ml-11'>
      {Array.from({ length: 2 }, (_, index) => index).map((item) => (
        <CommentListItem key={item} />
      ))}
    </div>
  )
}
