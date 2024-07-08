"use client";
import { Course, CourseTime } from "@/lib/types/db";
import Link from "next/link";
import { useState } from "react";

export default function Courses({
  courses,
  padding,
}: {
  courses: Course[];
  padding: string;
}) {
  const courseNumPerPage = 20;
  const [page, setPage] = useState(1);
  return (
    <>
      <table className="table-auto">
        <thead>
          <tr className="border-b sticky top-0 dark:bg-gray-900">
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
            .slice((page - 1) * courseNumPerPage, page * courseNumPerPage)
            .map((course, i) => (
              <tr key={i} className="border-b">
                <td className={`${padding}`}>{course.name}</td>
                <td className={`${padding}`}>
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
                </td>
                <td className={`${padding}`}>{course.instructor}</td>
                <td className={`${padding}`}>{course.room}</td>
                <td className={`${padding}`}>
                  {course.time.map((time, i) => (
                    <TimeComponent key={i} time={time} />
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          上一頁
        </button>
        <p>
          第{" "}
          <select
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
            className="p-1 bg-gray-100 dark:bg-gray-800"
          >
            {Array.from({
              length: Math.ceil(courses.length / courseNumPerPage),
            })
              .map((_, i) => i + 1)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>{" "}
          / {Math.ceil(courses.length / courseNumPerPage)} 頁
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(courses.length / courseNumPerPage)}
          className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          下一頁
        </button>
      </div>
    </>
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
        <p>第 {week.join(",")} 週</p>
      )}
      <p>({dayStr[time.day]})&nbsp;</p>
      <p>{session}</p>
    </div>
  );
};
