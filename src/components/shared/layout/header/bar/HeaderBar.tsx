import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import Link from "next/link";
import HeaderBarWrapper from "./HeaderBarWrapper";
import HeaderCart from "./HeaderCart";
import HeaderButton from "./HeaderRightButton";
import HeaderUser from "./HeaderUser";
import HeaderNavMobile from "../navigation/HeaderNavMobile";
import ProductSearchBox from "@/components/features/product/search/ProductSearchBox";
import CommontSearchTerm from "@/components/features/search/CommonSearchTerm";
import { ListInputItems } from "@/common/interfaces/ListInput";

const HeaderBar = ({
  headerMenuItems,
}: {
  headerMenuItems: ListInputItems;
}) => {
  return (
    <HeaderBarWrapper
      content={
        <>
          <Link
            href={"/"}
            className="w-[228px] max-md:w-[130px] justify-self-center"
          >
            <Image
              src="/assets/dmgd.png"
              alt="logo"
              width={828}
              height={75}
              className="object-contain"
            />
          </Link>

          <HeaderButton
            className="max-md:hidden"
            url="/location"
            icon={
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.4375 12.1875C23.4375 9.94974 22.5486 7.80362 20.9662 6.22129C19.3839 4.63895 17.2378 3.75 15 3.75C12.7622 3.75 10.6161 4.63895 9.03379 6.22129C7.45145 7.80362 6.5625 9.94974 6.5625 12.1875C6.5625 15.6488 9.33187 20.16 15 25.5637C20.6681 20.16 23.4375 15.6488 23.4375 12.1875ZM15 28.125C8.12437 21.8756 4.6875 16.5619 4.6875 12.1875C4.6875 9.45246 5.77399 6.82943 7.70796 4.89546C9.64193 2.96149 12.265 1.875 15 1.875C17.735 1.875 20.3581 2.96149 22.292 4.89546C24.226 6.82943 25.3125 9.45246 25.3125 12.1875C25.3125 16.5619 21.8756 21.8756 15 28.125Z"
                  fill="black"
                />
                <path
                  d="M15 15C15.7459 15 16.4613 14.7037 16.9887 14.1762C17.5162 13.6488 17.8125 12.9334 17.8125 12.1875C17.8125 11.4416 17.5162 10.7262 16.9887 10.1988C16.4613 9.67132 15.7459 9.375 15 9.375C14.2541 9.375 13.5387 9.67132 13.0113 10.1988C12.4838 10.7262 12.1875 11.4416 12.1875 12.1875C12.1875 12.9334 12.4838 13.6488 13.0113 14.1762C13.5387 14.7037 14.2541 15 15 15ZM15 16.875C13.7568 16.875 12.5645 16.3811 11.6854 15.5021C10.8064 14.623 10.3125 13.4307 10.3125 12.1875C10.3125 10.9443 10.8064 9.75201 11.6854 8.87294C12.5645 7.99386 13.7568 7.5 15 7.5C16.2432 7.5 17.4355 7.99386 18.3146 8.87294C19.1936 9.75201 19.6875 10.9443 19.6875 12.1875C19.6875 13.4307 19.1936 14.623 18.3146 15.5021C17.4355 16.3811 16.2432 16.875 15 16.875Z"
                  fill="black"
                />
              </svg>
            }
            label={
              <>
                Cửa hàng <br />
                gần bạn
              </>
            }
          />

          <div className="relative z-0 flex flex-col items-start justify-center flex-1 max-md:col-span-3 max-md:order-3">
            <ProductSearchBox />
          </div>

          <div className="flex h-10 gap-4 max-md:justify-end">
            <HeaderButton
              className="max-md:hidden"
              url="/order-tracking"
              icon={
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 23.75C10.663 23.75 11.2989 23.4866 11.7678 23.0178C12.2366 22.5489 12.5 21.913 12.5 21.25C12.5 20.587 12.2366 19.9511 11.7678 19.4822C11.2989 19.0134 10.663 18.75 10 18.75C9.33696 18.75 8.70107 19.0134 8.23223 19.4822C7.76339 19.9511 7.5 20.587 7.5 21.25C7.5 21.913 7.76339 22.5489 8.23223 23.0178C8.70107 23.4866 9.33696 23.75 10 23.75ZM22.5 23.75C23.163 23.75 23.7989 23.4866 24.2678 23.0178C24.7366 22.5489 25 21.913 25 21.25C25 20.587 24.7366 19.9511 24.2678 19.4822C23.7989 19.0134 23.163 18.75 22.5 18.75C21.837 18.75 21.2011 19.0134 20.7322 19.4822C20.2634 19.9511 20 20.587 20 21.25C20 21.913 20.2634 22.5489 20.7322 23.0178C21.2011 23.4866 21.837 23.75 22.5 23.75Z"
                    stroke="black"
                    strokeWidth="1.25"
                    strokeMiterlimit="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5625 21.25H18.75V8.25C18.75 8.05109 18.671 7.86032 18.5303 7.71967C18.3897 7.57902 18.1989 7.5 18 7.5H1.25M7.0625 21.25H4.5C4.40151 21.25 4.30398 21.2306 4.21299 21.1929C4.12199 21.1552 4.03931 21.1 3.96967 21.0303C3.90003 20.9607 3.84478 20.878 3.80709 20.787C3.7694 20.696 3.75 20.5985 3.75 20.5V14.375"
                    stroke="black"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.5 11.25H7.5"
                    stroke="black"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.75 11.25H25.7625C25.9075 11.25 26.0493 11.2921 26.1709 11.3711C26.2925 11.45 26.3885 11.5626 26.4475 11.695L28.685 16.73C28.7276 16.8256 28.7498 16.9291 28.75 17.0337V20.5C28.75 20.5985 28.7306 20.696 28.6929 20.787C28.6552 20.878 28.6 20.9607 28.5303 21.0303C28.4607 21.1 28.378 21.1552 28.287 21.1929C28.196 21.2306 28.0985 21.25 28 21.25H25.625M18.75 21.25H20"
                    stroke="black"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
              }
              label={
                <>
                  Tra cứu <br />
                  đơn hàng
                </>
              }
            />

            <div className="flex items-center gap-1">
              <HeaderUser />
              <Divider
                orientation="vertical"
                className="ml-1 bg-black h-4/5 max-md:hidden"
              />
              <HeaderCart />
            </div>
          </div>
        </>
      }
      menuContent={
        <div className="">
          <Divider />

          <HeaderNavMobile headerMenuItems={headerMenuItems} />

          <ul className="flex flex-col gap-3 py-4 text-sm border-t-2">
            <li>
              <Link href="/account" className="text-[#2F80ED]">
                Lịch sử mua hàng
              </Link>
            </li>
            <li>
              Tổng đài{" "}
              <Link href="tel:18006018" className="text-[#2F80ED]">
                1800 6018
              </Link>{" "}
              (7:30 - 22:00)
            </li>
            <li>
              Xem{" "}
              <Link href="/location" className="text-[#2F80ED]">
                3354
              </Link>{" "}
              siêu thị (7:30 - 22:00)
            </li>
          </ul>
        </div>
      }
    />
  );
};

export default HeaderBar;
