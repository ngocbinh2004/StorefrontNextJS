export const fallbackLng = "vn";
// export const languages = [fallbackLng, "en"];
export const languages = [fallbackLng];
export const defaultNS = "translation";

export function getOptions(
  lng: string = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
