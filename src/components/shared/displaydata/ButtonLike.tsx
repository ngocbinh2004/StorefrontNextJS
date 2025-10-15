"use client"

import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react"
import { useState } from "react"

export default function ButtonLike({
  value,
  onChange,
}: {
  value?: number
  onChange?: (value: number) => void
}) {
  const [internalValue, setInternalValue] = useState(value || 0)

  const handleChange = () => {
    const newValue = internalValue + 1
    setInternalValue(newValue)
    if (onChange) onChange(newValue)
  }

  return (
    <div
      className="flex gap-1 items-center cursor-pointer"
      onClick={handleChange}
    >
      {internalValue > 0 ? <IconThumbUpFilled size={15} /> : <IconThumbUp size={15} />}
      <span className="text-xs">Hữu ích {internalValue ? `(${internalValue})` : ""}</span>
    </div>
  )
}
