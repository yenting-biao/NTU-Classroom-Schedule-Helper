import { Course } from "@/lib/types/db";
import { courseSchema } from "@/lib/validators/courses";
import { clientPromise } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  // get search params
  const deptCode = req.nextUrl.searchParams.get("deptCode")?.slice(0, 3);
  const instructor = req.nextUrl.searchParams.get("instructor");
  const courseName = req.nextUrl.searchParams.get("courseName");
  const maxNum = req.nextUrl.searchParams.get("maxNum");
  const skip = req.nextUrl.searchParams.get("skip");
  const first = req.nextUrl.searchParams.get("first");
  const last = req.nextUrl.searchParams.get("last");
  try {
    const client = await clientPromise;
    const db = client.db("ntu-class-schedule");
    const collection = db.collection<Course>("courses");

    let query: any = {
      id: { $regex: new RegExp(`^${deptCode}`) },
      instructor: { $regex: new RegExp(instructor || "") },
      name: { $regex: new RegExp(courseName || "") },
    };
    if (first) {
      // get previous page
      query._id = { $lt: new ObjectId(first) };
    } else if (last) {
      // get next page
      query._id = { $gt: new ObjectId(last) };
    } else {
      // get first page
    }

    const total = skip ? 0 : await collection.countDocuments(query);

    let courses: Course[] = [];
    if (maxNum) {
      courses = (
        await collection
          .find(query)
          .skip(Number(skip))
          .sort({ _id: first ? -1 : 1 }) // if first is provided, sort in descending order
          .limit(Number(maxNum))
          .toArray()
      ).map((course) => {
        course._id = course._id.toString();
        return course;
      });
    } else {
      courses = (
        await collection
          .find(query)
          .skip(Number(skip))
          .sort({ _id: first ? -1 : 1 }) // if first is provided, sort in descending order
          .toArray()
      ).map((course) => {
        course._id = course._id.toString();
        return course;
      });
    }

    // Use zod to validate the data
    const validatedCourses = courses.map((course) =>
      courseSchema.parse(course),
    );

    return NextResponse.json(
      {
        courses: validatedCourses,
        total: total,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/courses ERROR:", error);
    return NextResponse.json("Failed to fetch data", { status: 500 });
  }
}
