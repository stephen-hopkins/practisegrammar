import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import { Encode_Sans } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppHeader from "../components/AppHeader/AppHeader";

const inter = Encode_Sans({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader className={inter.className} />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
