"use client";
import { useEffect, useRef, useState } from "react";
import { Course } from "@/lib/types/db";
import { getCourseSchema } from "@/lib/validators/courses";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SearchForm from "./_components/SearchForm";
import { CourseCard } from "./_components/CourseCard";
import PaginationComp from "./_components/Pagination";

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
  const scrollRef = useRef<HTMLParagraphElement>(null);
  const [prevSearch, setPrevSearch] = useState({
    deptCode: "",
    courseName: "",
    instructor: "",
  });

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

    if (!isNewSearch) {
      deptCode = prevSearch.deptCode;
      courseName = prevSearch.courseName;
      instructor = prevSearch.instructor;
    } else {
      setPrevSearch({
        deptCode,
        courseName,
        instructor,
      });
    }

    setLoading(true);
    setCourses(dummyCourses);
    if (scrollRef.current && !isNewSearch) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
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

  // Change skeleton theme based on system theme
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
        <p className="ml-1 pt-2" ref={scrollRef}>
          {loading ? "搜尋中..." : `找到 ${total} 筆資料`}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {courses.map((course, i) => (
            <CourseCard key={i} loading={loading} course={course} />
          ))}
        </div>
        <PaginationComp
          page={page}
          total={total}
          courseNumPerPage={courseNumPerPage}
          handleSearch={handleSearch}
        />
      </SkeletonTheme>
    </main>
  );
}
