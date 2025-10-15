"use client"
import useNavigation from "@/common/zustands/useNavigation"
import { IconMenuDeep } from "@tabler/icons-react"

export default function FooterMobileMenuToggleNavigation() {
  const [openMobileMenu, setShowMobileMenu] = useNavigation((state) => [
    state.openMobileMenu,
    state.setOpenMobileMenu,
  ])

  const handleClick = () => {
    setTimeout(() => window.scrollTo({
      top: 0,
      behavior: "smooth",
    }), 0)
    setShowMobileMenu(!openMobileMenu)
  }

  return (
    <div
      className="flex flex-col justify-center items-center text-[9px] gap-1"
      onClick={handleClick}
    >
      <IconMenuDeep />
      <span>Danh mục</span>
    </div>
  )
}
