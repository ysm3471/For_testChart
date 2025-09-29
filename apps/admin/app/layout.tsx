import type { Metadata } from "next"; 
import "./globals.css"; 
import "../../../styles/style.css"

export const metadata: Metadata = {
  title: "Admin for Test",
  description: "For show to clicked num Cnt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
