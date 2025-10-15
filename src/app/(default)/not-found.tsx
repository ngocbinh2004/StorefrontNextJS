import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto my-20 bg-white">
      <div className="max-w-[678px] mx-auto mb-5">
        <Image
          src={"/assets/404.png"}
          width={678}
          height={421}
          style={{ width: "100%", height: "auto" }}
          alt={"not-found"}
          priority
        />
      </div>
      <p className="text-center text-16">
        Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
      </p>
      <button className="border-1 my-2 flex items-center justify-center rounded py-2 w-[250px] mx-auto bg-black">
        <Link href="/">
          <p className="text-14 font-bold text-white">Về trang chủ </p>
        </Link>
      </button>
    </div>
  );
}
