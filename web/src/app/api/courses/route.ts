import { Course } from "@/lib/types/db";
import { courseSchema } from "@/lib/validators/courses";
import { client } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  // get search params
  const deptCode = req.nextUrl.searchParams.get("deptCode")?.slice(0, 3);
  const instructor = req.nextUrl.searchParams.get("instructor");
  const courseName = req.nextUrl.searchParams.get("courseName");
  try {
    await client.connect();
    const db = client.db("ntu-class-schedule");
    const collection = db.collection<Course>("courses");
    const courses = await collection
      .find({
        id: { $regex: new RegExp(`^${deptCode}`) },
        instructor: { $regex: new RegExp(instructor || "") },
        name: { $regex: new RegExp(courseName || "") },
      })
      .toArray();

    // Use zod to validate the data
    const validatedCourses = courses.map((course) =>
      courseSchema.parse(course)
    );

    return NextResponse.json(validatedCourses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to fetch data", { status: 500 });
  }
}
