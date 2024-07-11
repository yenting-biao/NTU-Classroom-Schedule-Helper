import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import React from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "台大教室課表小幫手",
  description: "讓你輕鬆查詢教室課表上的課程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-dvh`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={["light", "dark"]}
        >
          <div className="p-5 flex flex-col items-center md:flex-row md:items-end gap-2">
            <h1 className="text-4xl font-bold">台大教室課表小幫手</h1>
            <p className="text-lg">讓你輕鬆查詢教室課表上的課程</p>
          </div>
          <div className="px-6">
            資料更新時間：2024/07/11 17:00
            <br />
            注意事項與免責聲明：
            <ul className="list-disc list-inside">
              <li>
                此網頁僅為個人專案，課程資料僅供參考，應以臺大課程網站之公告為準。
              </li>
              <li>
                系所名稱的搜尋功能僅以教室課表上的課程識別碼之前三碼進行比對，可能有錯誤或缺漏，請以臺大課程網站為主。
              </li>
            </ul>
          </div>
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
          <footer className="p-5 pt-2 text-center text-sm">
            如果有發現任何問題或建議，歡迎至 GitHub 提出 Issue：
            <Link
              href="https://github.com/yenting-biao/NTU-Classroom-Schedule-Helper/issues"
              className="underline hover:text-blue-500"
              target="_blank"
              rel="noreferrer noopener"
            >
              Link
            </Link>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
