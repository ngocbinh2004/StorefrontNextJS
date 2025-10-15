import { Divider } from "@nextui-org/divider"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import {
  IconBox,
  IconBoxSeam,
  IconDiscountCheck,
  IconTruckDelivery,
  IconWorld,
} from "@tabler/icons-react"
import TextDateTime from "@/components/shared/displaydata/TextDateTime"
import dayjs from "dayjs"

export default function AccountTabOrderTracking() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-md text-gray-600">
          {'Để theo dõi đơn hàng của bạn, vui lòng nhập mã đơn hàng của bạn vào ô bên dưới và nhấn nút "Theo dõi".'}
          <br />
          {'Mã này đã được cung cấp trên biên nhận của bạn và trong email xác nhận mà bạn đã nhận được.'}
        </p>
        <div className="flex gap-2 my-5">
          <Input className="w-96" placeholder="FDSFWRFAF13585" aria-label="Theo dõi" />
          <Button color="primary">Theo dõi</Button>
        </div>
      </div>

      <Divider />

      <div>
        <h3 className="my-2 text-3xl font-bold">
        Tình trạng đơn hàng:{" "}
          <span className="color-success">Vận chuyển quốc tế</span>
        </h3>
        <h6 className="text-gray-500">
          Dự kiến giao hàng ngày: <TextDateTime ts={dayjs().unix()} />
        </h6>
      </div>

      <div>
        <div className="grid grid-cols-5 max-md:grid-cols-3">
          <div>
            <div className="relative">
              <div className="absolute left-1 top-[26px] h-3 w-full bg-slate-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-green-500 text-white">
                <IconDiscountCheck />
              </div>
              <h6 className="mt-5 font-bold">Đang vận chuyển</h6>
              <p className="text-gray-500"><TextDateTime ts={dayjs().unix()} /></p>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute left-1 top-[26px] h-3 w-full bg-slate-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-green-500 text-white">
                <IconBox />
              </div>
              <h6 className="mt-5 font-bold">Đang xử lý</h6>
              <p className="font-md text-gray-500"><TextDateTime ts={dayjs().unix()} /></p>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute left-1 top-[26px] h-3 w-full bg-slate-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-green-500 text-white">
                <IconWorld />
              </div>
              <h6 className="mt-5 font-bold">Đang xử lý</h6>
              <p className="font-md text-gray-500"><TextDateTime ts={dayjs().unix()} /></p>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute left-1 top-[26px] h-3 w-full bg-slate-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-slate-200 text-black">
                <IconTruckDelivery />
              </div>
              <h6 className="mt-5 font-bold">Đang xử lý</h6>
              <p className="font-md text-gray-500"><TextDateTime ts={dayjs().unix()} /></p>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-slate-200 text-black">
                <IconBoxSeam />
              </div>
              <h6 className="mt-5 font-bold">Đã giao hàng</h6>
              <p className="font-md text-gray-500"><TextDateTime ts={dayjs().unix()} /></p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-gray-500">
        <ul className="list-disc list-inside leading-8">
          <li><TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: Đang giao hàng</li>
          <li>
          <TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: The order has arrived at warehouse 05-YBI
            Marvel LM Hub
          </li>
          <li><TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: Order has been shipped</li>
          <li>
          <TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: The order has arrived at Marvel SOC warehouse
          </li>
          <li><TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: Order has been shipped</li>
          <li>
          <TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: The order has arrived at Marvel SOC warehouse
          </li>
          <li><TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: Order has been shipped</li>
          <li>
          <TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: The order has arrived at warehouse 20-HNI
            Marvel 2 SOC
          </li>
          <li><TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: Successful pick up</li>
          <li><TextDateTime ts={dayjs().unix()} format="hh:mm DD/MM/YYYY" />: The sender is preparing the goods</li>
        </ul>
      </div>

      <div>
        <h3 className="my-2 text-3xl font-bold">Vị trí đơn hàng</h3>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15678.437170729663!2d106.64269358715819!3d10.764564699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f25dec95615%3A0xe62ab74afd77536b!2zRGkgxJDhu5luZyBWaeG7h3Q!5e0!3m2!1svi!2s!4v1689829579062!5m2!1svi!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96"
        ></iframe>
      </div>
    </div>
  )
}
