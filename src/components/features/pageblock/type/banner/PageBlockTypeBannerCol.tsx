import { ListInputItems } from "@/common/interfaces/ListInput";
import Image from "next/image";
import Link from "next/link";

const PageBlockTypeBannerCol = ({
  listPhotos,
  gridCols,
  photoHeight,
  backgroundColor,
}: {
  listPhotos: ListInputItems;
  gridCols: string;
  photoHeight: string;
  backgroundColor?: string;
}) => {
  let height: string = photoHeight !== "" ? `${photoHeight}px` : `100%`;

  return (
    <div
      className={gridCols}
      style={{ backgroundColor: backgroundColor || "" }}
    >
      {listPhotos.map((i) => {
        const avatarUrl =
          i.photo.files.length > 0
            ? i.photo.files[0].url
            : "/assets/no-image.svg";
        const link = i.link !== "" ? i.link : "/";
        return (
          <div
            key={i.key}
            style={{ height: height }}
            className={`flex flex-col col-span-1 text-center`}
          >
            <div className={`flex flex-col flex-1`} style={{ height: height }}>
              <Link title={i.title} href={link}>
                <Image
                  src={avatarUrl}
                  className={`w-full`}
                  style={{ height: height }}
                  height={photoHeight !== "" ? +photoHeight : 0}
                  width={0}
                  title={i.title}
                  sizes="100vw"
                  alt={i.title}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PageBlockTypeBannerCol;
