import { privateEnv } from "@/lib/env/private";
import { Course } from "@/lib/types/db";
import { MongoClient, ServerApiVersion } from "mongodb";
import { courseSchema } from "@/lib/validators/courses";

export const dynamic = "force-dynamic";

const client = new MongoClient(privateEnv.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
