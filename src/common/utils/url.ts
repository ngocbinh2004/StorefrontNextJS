type UrlUtilProps = {
  paginationUrl: string;
  paramName: string;
  paramValue: string | null;
  isMultiple: boolean;
};

export type { UrlUtilProps };

export default class UrlUtil {
  static buildUrl({
    paginationUrl,
    paramName,
    paramValue,
    isMultiple,
  }: UrlUtilProps) {
    //define multiple value separators
    const separator = ".";

    //create URL class for url manipulating
    const url = new URL(
      paginationUrl,
      process.env.NEXT_PUBLIC_WEB_BASE_URL || "http://localhost"
    );

    //extract current values from url
    const existedParamValueString = url.searchParams.get(paramName) || "";
    const existedParamValueList =
      existedParamValueString.length > 0
        ? existedParamValueString.split(separator)
        : [];

    //if set paramValue to null, need to remove param
    if (typeof paramValue === "undefined" || paramValue === null) {
      url.searchParams.delete(paramName);
    } else {
      //detect already have current value
      if (existedParamValueList.includes(paramValue)) {
        //only single param value found, remove param
        if (existedParamValueList.length === 1 || !isMultiple) {
          url.searchParams.delete(paramName);
        } else {
          const newParamValueList = existedParamValueList.filter(
            (v) => v !== paramValue
          );
          url.searchParams.set(paramName, newParamValueList.join(separator));
        }
      } else {
        //if multiple, we create new string
        if (isMultiple) {
          url.searchParams.set(
            paramName,
            [...existedParamValueList, paramValue].join(separator)
          );
        } else {
          //override if not multiple
          url.searchParams.set(paramName, paramValue);
        }
      }
    }

    //ensure param in order
    url.searchParams.sort();

    const newUrl = `${url.pathname}${url.search}`;

    return newUrl;
  }
}
