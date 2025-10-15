import dayjs from "dayjs";

const TextDateTime = ({ ts, format }: { ts: number; format?: string }) => {
  let initialFormat = "DD/MM/YYYY";
  if (format !== "" && format !== undefined) {
    initialFormat = format;
  }

  return <span>{dayjs.unix(ts).format(initialFormat)}</span>;
};

export default TextDateTime;
