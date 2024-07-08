import { Course } from "@/lib/types/db";
import { courseSchema } from "@/lib/validators/courses";
import { client } from "@/db/client";

export const dynamic = "force-dynamic";

export const getAllCourseData = async () => {
  "use server";
  try {
    await client.connect();
    const db = client.db("ntu-class-schedule");
    const collection = db.collection<Course>("courses");
    const courses = await collection.find().toArray();

    // Use zod to validate the data
    const validatedCourses = courses.map((course) =>
      courseSchema.parse(course)
    );

    return validatedCourses;
  } catch (error) {
    console.error(error);
    return [];
  }
};
