import { ListInputItems } from "@/common/interfaces/ListInput";
import Image from "next/image";
import Link from "next/link";

const PageBlockTypeBannerWrap = ({
  listPhotos,
  photoHeight,
  photoWidth,
}: {
  listPhotos: ListInputItems;
  photoHeight: string;
  photoWidth: string;
}) => {
  let width: string = photoWidth !== "" ? `${photoWidth}px` : `100%`;
  let height: string = photoHeight !== "" ? `${photoHeight}px` : `100%`;

  return listPhotos.map((i) => {
    const avatarUrl =
      i.photo.files.length > 0 ? i.photo.files[0].url : "/assets/no-image.svg";
    const link = i.link !== "" ? i.link : "/";

    return (
      <Link key={i.key} href={link} title={i.title}>
        <Image
          src={avatarUrl}
          style={{ width: width, height: height }}
          height={photoHeight !== "" ? +photoHeight : 0}
          width={photoWidth !== "" ? +photoWidth : 0}
          title={i.title}
          alt={i.title}
          className="rounded-none"
        />
      </Link>
    );
  });
};

export default PageBlockTypeBannerWrap;
