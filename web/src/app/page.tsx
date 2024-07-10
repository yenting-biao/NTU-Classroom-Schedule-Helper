"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchBox from "./_components/SearchBox";
import DepartmentSelect from "./_components/DepartmentSelect";
import { Course, CourseTime } from "@/lib/types/db";
import { courseSchema, getCourseSchema } from "@/lib/validators/courses";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const courseNumPerPage = 20;
  const dummyCourses: Course[] = Array.from({ length: courseNumPerPage }).map(
    (_, i) => ({
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

  const courseNameRef = useRef<HTMLInputElement>(null);
  const instructorRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);

  // input parameters: indicating initial search, or go to next page, or go to previous page
  const handleSearch = async (
    targetPage: number = 1,
    isNewSearch: boolean = true,
  ) => {
    if (targetPage < 1 || targetPage > Math.ceil(total / courseNumPerPage)) {
      return;
    }

    setLoading(true);
    setCourses(dummyCourses);
    let searchUrl = "/api/courses?";
    searchUrl += `deptCode=${departmentRef.current?.value}&`;
    searchUrl += `&instructor=${instructorRef.current?.value}`;
    searchUrl += `&courseName=${courseNameRef.current?.value}`;
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

  const padding = "p-5";
  return (
    <main className="flex flex-col p-5 gap-5 flex-1">
      <SkeletonTheme
        baseColor={theme?.baseColor}
        highlightColor={theme?.highlightColor}
      >
        {/* <Courses origCourses={courses || []} padding={padding} /> */}
        <div className="flex flex-col items-start md:flex-row md:items-end gap-2">
          <DepartmentSelect
            departmentRef={departmentRef}
            handleSearch={handleSearch}
          />
          <SearchBox
            label="課程名稱"
            searchRef={courseNameRef}
            placeholder="搜尋課程名稱"
            handleSearch={handleSearch}
          />
          <SearchBox
            label="授課教師"
            searchRef={instructorRef}
            placeholder="搜尋授課教師"
            handleSearch={handleSearch}
          />
          <button
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg whitespace-nowrap"
            onClick={() => {
              handleSearch();
            }}
          >
            搜尋
          </button>
        </div>
        <p className="ml-1">{loading ? "搜尋中..." : `找到 ${total} 筆資料`}</p>
        <table className="table-auto">
          <thead>
            <tr className="border-b sticky top-0 dark:bg-[rgb(25,25,25)] bg-slate-100">
              <th className={`text-left ${padding}`}>課程名稱</th>
              <th className={`text-left ${padding} md:whitespace-nowrap`}>
                課程識別碼與班次
              </th>
              <th className={`text-left ${padding}`}>授課教師</th>
              <th className={`text-left ${padding}`}>上課地點</th>
              <th className={`text-left ${padding}`}>上課時間</th>
            </tr>
          </thead>
          <tbody>
            {courses
              //.slice((page - 1) * courseNumPerPage, page * courseNumPerPage)
              .map((course, i) => (
                <TableRow
                  key={i}
                  loading={loading}
                  padding={padding}
                  course={course}
                />
              ))}
          </tbody>
        </table>
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={async () => {
              await handleSearch(page - 1, false);
            }}
            disabled={page === 1}
            className={`p-2 bg-gray-200 dark:bg-gray-800 ${
              page === 1
                ? "cursor-not-allowed"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            } rounded-lg`}
          >
            上一頁
          </button>
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
          <button
            onClick={async () => {
              await handleSearch(page + 1, false);
            }}
            disabled={page === Math.ceil(total / courseNumPerPage)}
            className={`p-2 bg-gray-200 dark:bg-gray-800 ${
              page === Math.ceil(total / courseNumPerPage)
                ? "cursor-not-allowed"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            } rounded-lg`}
          >
            下一頁
          </button>
        </div>
      </SkeletonTheme>
    </main>
  );
}

function TableRow({
  loading,
  padding,
  course,
}: {
  loading: boolean;
  padding: string;
  course: Course;
}) {
  const sortedTime = course.time.sort((a, b) => a.day - b.day);
  return (
    <tr className="border-b">
      <td className={`${padding}`}>{loading ? <Skeleton /> : course.name}</td>
      <td className={`${padding}`}>
        {loading ? (
          <Skeleton />
        ) : (
          <Link
            href={`https://coursemap.aca.ntu.edu.tw/course_map_all/course.php?code=${
              course.id.split(" ")[0]
            }+${course.id.split(" ")[1].split("-")[0]}`}
            className="hover:text-blue-500 underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            {course.id}
          </Link>
        )}
      </td>
      <td className={`${padding}`}>
        {loading ? <Skeleton /> : course.instructor}
      </td>
      <td className={`${padding}`}>{loading ? <Skeleton /> : course.room}</td>
      <td className={`${padding}`}>
        {loading ? (
          <Skeleton />
        ) : (
          sortedTime.map((time, i) => <TimeComponent key={i} time={time} />)
        )}
      </td>
    </tr>
  );
}

const TimeComponent = ({ time }: { time: CourseTime }) => {
  const week = time.weeks.sort();
  const day = time.day;
  const start_time = time.start_time;
  const end_time = time.end_time;

  const dayStr = ["日", "一", "二", "三", "四", "五", "六"];
  const sessionStr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "A",
    "B",
    "C",
    "D",
  ];
  const startIndex = sessionStr.indexOf(start_time);
  const endIndex = sessionStr.indexOf(end_time);
  const session = sessionStr.slice(startIndex, endIndex + 1);
  return (
    <div className="flex">
      {week.length === 1 ? (
        week[0] === 0 ? null : week[0] === -1 ? (
          <p>單週</p>
        ) : week[0] === -2 ? (
          <p>雙週</p>
        ) : (
          <p>此筆資料有問題</p>
        )
      ) : (
        <p>第 {week.join(",")} 週&nbsp;</p>
      )}
      <p>({dayStr[time.day]})&nbsp;</p>
      <p>{session}</p>
    </div>
  );
};
