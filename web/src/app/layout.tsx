import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "台大教室課表小助手",
  description: "讓你輕鬆查詢教室課表上的課程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-5 flex items-end gap-2">
          <h1 className="text-4xl font-bold">台大教室課表小幫手</h1>
          <p className="text-lg">讓你輕鬆查詢教室課表上的課程</p>
        </div>
        {children}
      </body>
    </html>
  );
}
