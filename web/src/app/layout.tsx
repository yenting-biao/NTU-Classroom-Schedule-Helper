import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import React from "react";
import Link from "next/link";
import { clientPromise } from "@/db/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "台大教室課表小幫手",
  description: "讓你輕鬆查詢教室課表上的課程",
};

export const revalidate = 3600;

async function getUpdateTime(): Promise<string | null> {
  try {
    const client = await clientPromise;
    const db = client.db("ntu-class-schedule");
    const collection = db.collection("metadata");
    const doc = await collection.findOne({ type: "data_update_time" });
    return doc?.time ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const updateTime = await getUpdateTime();

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-dvh`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={["light", "dark"]}
        >
          <div className="p-5 mt-3 flex flex-col items-center ">
            <h1 className="mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              台大教室課表小幫手
            </h1>
            <p className="text-md pb-2 leading-7">
              讓你輕鬆查詢教室課表上的課程
            </p>
          </div>
          <div className="px-5">
            資料更新時間：{updateTime || "每天 18:00"}
            <br />
            <p className="mt-2">注意事項與免責聲明：</p>
            <ul className="mb-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                此網頁僅為個人專案，課程資料僅供參考，應以臺大課程網站之公告為準。
              </li>
              <li>
                系所名稱的搜尋功能僅以教室課表上的課程識別碼之前三碼進行比對，可能有錯誤或缺漏，請以臺大課程網站為主。
              </li>
            </ul>
          </div>
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
          <footer className="p-5 pt-2 text-center text-sm ">
            如果有發現任何問題或建議，歡迎至 GitHub 提出 Issue：
            <Link
              href="https://github.com/yenting-biao/NTU-Classroom-Schedule-Helper/issues"
              className="underline hover:text-blue-500 "
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
