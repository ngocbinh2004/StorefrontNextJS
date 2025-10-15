"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";

//
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (locale: string, namespace: string) =>
        import(`/src/app/i18n/locales/${locale}/${namespace}.json`)
    )
  )
  .init(getOptions());

export function useTranslation(
  locale: string,
  ns: string | string[],
  options?: any
) {
  if (i18next.resolvedLanguage !== locale) i18next.changeLanguage(locale);
  return useTranslationOrg(ns, options);
}

export default i18next;
