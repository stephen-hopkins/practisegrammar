import { Encode_Sans } from "@next/font/google";
import AppHeader from "../components/AppHeader/AppHeader";
import "@/src/styles/globals.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import Providers from "./providers";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

const inter = Encode_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practice Grammar",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
