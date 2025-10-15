import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { IconPhotoPlus } from "@tabler/icons-react"
import CommentImageList from "./CommentImageList"

export default function CommentForm() {
  return (
    <div>
      <div className="flex w-full items-start justify-between gap-2 max-md:flex-wrap mt-4">
        <div className="w-7/12 max-md:w-full">
          <Textarea
            variant="bordered"
            minRows={5}
            placeholder="Nhận xét về sản phẩm"
            classNames={{
              label: "hidden",
              helperWrapper: "hidden",
              inputWrapper: "rounded-b-none shadow-none",
            }}
          />
          <label htmlFor="upload" className="flex py-1 px-2 gap-2 rounded-md border cursor-pointer rounded-t-none border-t-0">
            <IconPhotoPlus /> Đính kèm ảnh
            <Input id="upload" type="file" className="hidden" />
          </label>
        </div>
        <div className="w-5/12 flex flex-col gap-2 max-md:w-full h-[151px] justify-between">
          <Input
            variant="bordered"
            placeholder="Họ và tên"
            aria-label="Họ và tên"
          />
          <Input
            variant="bordered"
            placeholder="Số điện thoại"
            aria-label="Số điện thoại"
          />
          <Button color="primary">Gửi</Button>
        </div>
      </div>
      <CommentImageList className="ml-0 mt-2" />
    </div>
  )
}
