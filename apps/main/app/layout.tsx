import type { Metadata } from "next"; 
import "./globals.css"; 
import "../../../styles/style.css"

export const metadata: Metadata = {
  title: "Main for Test",
  description: "Click Buttons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body >
        {children}
      </body>
    </html>
  );
}
