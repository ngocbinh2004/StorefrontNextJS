import Image from "next/image";
import Link from "next/link";

const PageBlockDisplayImage = ({
  link,
  url,
  width,
  height,
  alt,
}: {
  link?: string;
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}) => {
  return (
    <Link rel="noreferrer" target="_blank" href={link || "/"}>
      <Image
        src={url}
        className="object-contain"
        height={height || 40}
        width={width || 74}
        alt={alt ?? ""}
      />
    </Link>
  );
};

export default PageBlockDisplayImage;
