import dayjs from "dayjs";
import React from "react";

const TextDateTimeRelative = ({
  ts,
  className,
}: {
  ts: number;
  className?: string;
}) => {
  return (
    <span className={className}>{/* <>{dayjs.unix(ts).fromNow()}</> */}</span>
  );
};

export default TextDateTimeRelative;
