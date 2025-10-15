"use client";
import { Spinner } from "@nextui-org/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

interface IncrementProps {
  defaultValue?: number;
  max?: number;
  min: number;
  disabled?: boolean;
  onChange?: (v: number) => void;
}

export default function FormInputIncrement({
  defaultValue,
  max,
  min,
  disabled,
  onChange,
}: IncrementProps) {
  const _max = typeof max === "number" ? max : Infinity;

  const [value, setValue] = useState(defaultValue || min);

  const handleChange = useCallback(
    (offset: number) => {
      if (!disabled) {
        const newValue = value + offset;
        if (newValue <= _max && newValue >= min) {
          setValue(newValue);
          if (typeof onChange !== "undefined") {
            onChange(newValue);
          }
        }
      }
    },
    [onChange, min, _max, value, disabled]
  );

  useEffect(() => {
    if (typeof defaultValue !== "undefined" && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  return (
    <div className="rounded-sm flex items-center justify-start h-8 border max-w-fit">
      <div
        className="w-8 h-full flex justify-center items-center border-none cursor-pointer hover:bg-accent text-primary opacity-70 hover:opacity-100"
        onClick={() => handleChange(-1)}
      >
        {disabled ? <Spinner size="sm" /> : <IconMinus size={18} />}
      </div>
      <div className="font-bold w-12 h-full flex justify-center items-center border-x">
        {value}
      </div>
      <div
        className="w-8 flex h-full justify-center items-center border-none cursor-pointer hover:bg-accent text-primary opacity-70 hover:opacity-100"
        onClick={() => handleChange(1)}
      >
        {disabled ? <Spinner size="sm" /> : <IconPlus size={18} />}
      </div>
    </div>
  );
}
