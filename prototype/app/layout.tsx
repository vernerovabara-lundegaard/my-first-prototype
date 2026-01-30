import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klientská zóna | Pojištění odpovědnosti",
  description: "Small client zone (KZ) prototype – civil liability insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
