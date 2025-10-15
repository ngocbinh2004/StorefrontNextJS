import { cn } from "@/common/utils/cn";
import ImageThumbnail from "@/components/shared/displaydata/ImageThumb";

export default function CommentImageList({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 flex-wrap", className)}>
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
        <ImageThumbnail key={i} width={60} height={62} src="" alt="" />
      ))}
    </div>
  );
}
