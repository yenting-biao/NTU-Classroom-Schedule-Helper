"use client";
import { useEffect, useState } from "react";
import { Course } from "@/lib/types/db";
import { getCourseSchema } from "@/lib/validators/courses";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import SearchForm from "./_components/SearchForm";
import { CourseCard } from "./_components/CourseCard";

export default function Home() {
  const courseNumPerPage = 20;
  const dummyCourses: Course[] = Array.from({ length: courseNumPerPage }).map(
    () => ({
      _id: "",
      id: "",
      name: "",
      instructor: "",
      room: "",
      time: [],
    }),
  );

  const [courses, setCourses] = useState<Course[]>(dummyCourses);
  const [total, setTotal] = useState<number>(dummyCourses.length);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // input parameters: indicating initial search, or go to next page, or go to previous page
  const handleSearch = async (
    targetPage: number = 1,
    isNewSearch: boolean = true,
    deptCode: string = "",
    courseName: string = "",
    instructor: string = "",
  ) => {
    if (
      !isNewSearch &&
      (targetPage < 1 || targetPage > Math.ceil(total / courseNumPerPage))
    ) {
      return;
    }

    setLoading(true);
    setCourses(dummyCourses);
    let searchUrl = "/api/courses?";
    searchUrl += `deptCode=${deptCode === "0000" ? "" : deptCode}&`;
    searchUrl += `&courseName=${courseName}`;
    searchUrl += `&instructor=${instructor}`;
    searchUrl += `&maxNum=${courseNumPerPage}`;
    if (!isNewSearch) {
      searchUrl += `&skip=${(Math.abs(targetPage - page) - 1) * courseNumPerPage}`;
      if (targetPage > page) {
        searchUrl += `&last=${courses[courses.length - 1]._id}`;
      } else {
        searchUrl += `&first=${courses[0]._id}`;
      }
    }
    try {
      const res = await fetch(searchUrl);
      const data = await res.json();
      const validatedData = getCourseSchema.parse(data);
      if (!isNewSearch && targetPage < page) {
        validatedData.courses.reverse();
      }
      setCourses(validatedData.courses);
      if (isNewSearch) {
        setTotal(validatedData.total);
      }
      setLoading(false);
      setPage(targetPage);
    } catch (error) {
      console.error("GET /api/courses ERROR:", error);
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [theme, setTheme] = useState({
    baseColor: "#",
    highlightColor: "#",
  });

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (prefersDark) {
      setTheme({
        baseColor: "#202020",
        highlightColor: "#444",
      });
    } else {
      setTheme({
        baseColor: "#ebebeb",
        highlightColor: "#f5f5f5",
      });
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (e.matches) {
          setTheme({
            baseColor: "#202020",
            highlightColor: "#444",
          });
        } else {
          setTheme({
            baseColor: "#ebebeb",
            highlightColor: "#f5f5f5",
          });
        }
      });

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  return (
    <main className="flex flex-col p-5 gap-5 flex-1">
      <SkeletonTheme
        baseColor={theme?.baseColor}
        highlightColor={theme?.highlightColor}
      >
        <SearchForm handleSearch={handleSearch} />
        <p className="ml-1">{loading ? "搜尋中..." : `找到 ${total} 筆資料`}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {courses.map((course, i) => (
            <CourseCard key={i} loading={loading} course={course} />
          ))}
        </div>
        <div className="flex items-center gap-3 justify-center">
          <Button
            onClick={async () => {
              await handleSearch(page - 1, false);
            }}
            disabled={page === 1}
          >
            上一頁
          </Button>
          <p>
            第{" "}
            <label htmlFor="page" className="sr-only">
              頁數
            </label>
            <select
              id="page"
              value={page}
              onChange={async (e) => {
                await handleSearch(parseInt(e.target.value), false);
              }}
              className="p-1 bg-gray-200 dark:bg-gray-800 rounded-md"
            >
              {Array.from({
                length: Math.ceil(total / courseNumPerPage),
              })
                .map((_, i) => i + 1)
                .map((i) => (
                  <option key={i} value={i} className="rounded-sm">
                    {i}
                  </option>
                ))}
            </select>{" "}
            / {Math.ceil(total / courseNumPerPage)} 頁
          </p>
          <Button
            onClick={async () => {
              await handleSearch(page + 1, false);
            }}
            disabled={page === Math.ceil(total / courseNumPerPage)}
          >
            下一頁
          </Button>
        </div>
      </SkeletonTheme>
    </main>
  );
}
