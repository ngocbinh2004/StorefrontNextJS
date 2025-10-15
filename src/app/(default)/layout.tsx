import CompanySettingApi from "@/common/api/server/CompanySettingApi";
import CompanySettingContextProvider from "@/common/contexts/CompanySettingContextProvider";
import LayoutFooter from "@/components/shared/layout/footer/Footer";
import FooterMobileMenu from "@/components/shared/layout/footer/mobile/FooterMobileMenu";
import LayoutHeader from "@/components/shared/layout/header/Header";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../globals.css";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Metadata } from "next";
require("dayjs/locale/vi");

dayjs.locale("vi");
dayjs.extend(relativeTime);

export const metadata = siteConfig.metadata.default;

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
            <LayoutHeader />
            {children}
            <FooterMobileMenu />
            <LayoutFooter />
          </CompanySettingContextProvider>
        </Providers>
      </body>
    </html>
  );
}
