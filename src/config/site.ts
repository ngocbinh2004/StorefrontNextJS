export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  metadata: {
    default: {
      metadataBase: `${process.env.NEXT_PUBLIC_WEB_BASE_URL}`,
      title: "Oviro.vn | Sample Storefront - Unified Commerce System",
      author: "Điện máy gia dụng",
      description: "",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
      openGraph: {
        type: "website",
        locale: "vi",
        siteName: "",
      },
    },
    recovery: {
      title: "Khôi phục mật khẩu",
      description: "Tính năng khôi phục lại mật khẩu cho tài khoản của bạn",
    },
  },
};
