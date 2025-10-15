"use client";

import { createContext } from "react";
import { CompanySettingProvider } from "../types/CompanySettingProvider";

import CompanySettingModel from "../models/CompanySettingModel";
import { CompanySettingEntry } from "../types/CompanySetting";

export const CompanySettingContext = createContext<CompanySettingEntry>({});

export default function CompanySettingContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CompanySettingEntry;
}) {
  return (
    <CompanySettingContext.Provider value={value}>
      {children}
    </CompanySettingContext.Provider>
  );
}
