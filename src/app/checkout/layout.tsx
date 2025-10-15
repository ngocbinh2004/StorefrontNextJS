import CompanySettingApi from "@/common/api/server/CompanySettingApi";
import CompanySettingContextProvider from "@/common/contexts/CompanySettingContextProvider";
import { fontSans } from "@/config/fonts";
import { Providers } from "../(default)/providers";
import "../globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companySetting = await CompanySettingApi.getSetting();

  return (
    <html lang="vi">
      <body className={fontSans.className}>
        <Providers>
          <CompanySettingContextProvider value={companySetting.toJson()}>
            {children}
          </CompanySettingContextProvider>
        </Providers>
      </body>
    </html>
  );
}
