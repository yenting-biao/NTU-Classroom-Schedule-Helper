import { Course } from "@/lib/types/db";
import { courseSchema } from "@/lib/validators/courses";
import { client } from "@/db/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  // get search params
  try {
    await client.connect();
    const db = client.db("ntu-class-schedule");
    const collection = db.collection<Course>("courses");
    const courses = await collection.find().toArray();

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
