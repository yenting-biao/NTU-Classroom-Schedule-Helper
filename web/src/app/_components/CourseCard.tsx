import * as React from "react";

import { Course, CourseTime } from "@/lib/types/db";
import { FaRegUser } from "react-icons/fa";
import { LuSchool } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CourseCard({
  loading,
  course,
}: {
  loading: boolean;
  course: Course;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium">
          {loading ? <Skeleton /> : course.name}
        </CardTitle>
        <CardDescription className="text-primary">
          {loading ? (
            <Skeleton />
          ) : (
            <Link
              href={`https://coursemap.aca.ntu.edu.tw/course_map_all/course.php?code=${
                course.id.split(" ")[0]
              }+${course.id.split(" ")[1].split("-")[0]}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              {course.id}
            </Link>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-md p-4 pt-0">
        <div className="flex flex-col sm:flex-row gap-2">
          <SmallDiv loading={loading}>
            <FaRegUser size={15} />
            {course.instructor}
          </SmallDiv>
          <SmallDiv loading={loading}>
            <LuSchool size={15} />
            {course.room}
          </SmallDiv>
          <SmallDiv loading={loading}>
            <MdOutlineCalendarToday size={15} />
            <div className="flex gap-1">
              {course.time
                .sort((a, b) => a.day - b.day)
                .map((time, i) =>
                  getFmtTime(i == 0 ? time : { ...time, weeks: [0] }),
                )
                .join(" ")}
            </div>
          </SmallDiv>
        </div>
      </CardContent>
    </Card>
  );
}

const SmallDiv = ({
  children,
  loading,
  className,
}: {
  children: React.ReactNode;
  loading: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full border w-fit text-sm",
      className,
    )}
  >
    {loading ? <Skeleton width={60} /> : children}
  </div>
);

const getFmtTime = (time: CourseTime) => {
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
  let string = "";
  if (week.length === 1) {
    if (week[0] === 0) {
      string = "";
    } else if (week[0] === -1) {
      string = "（單週）";
    } else if (week[0] === -2) {
      string = "（雙週）";
    } else {
      string = "此筆資料有問題";
    }
  } else {
    string = "（第 " + week.join(",") + " 週）";
  }
  string += dayStr[day] + " " + session;
  return string;
};
