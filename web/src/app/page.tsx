import { getAllCourseData } from "@/app/_components/action";
import Courses from "@/app/_components/Courses";

export const dynamic = "force-dynamic";

export default async function Home() {
  const courses = await getAllCourseData();

  const padding = "p-5";
  return (
    <main className="flex min-h-screen flex-col p-5 gap-5">
      <Courses origCourses={courses} padding={padding} />
    </main>
  );
}
