import { Roboto as FontSans } from "next/font/google";

export const fontSans = FontSans({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});
