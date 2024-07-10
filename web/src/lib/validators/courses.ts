import { z } from "zod";

export const courseTimeSchema = z.object({
  weeks: z.array(z.number()),
  day: z.number(),
  start_time: z.string(),
  end_time: z.string(),
});

export const courseSchema = z.object({
  _id: z.string(),
  id: z.string(),
  name: z.string(),
  instructor: z.string(),
  room: z.string(),
  time: z.array(courseTimeSchema),
});

export const getCourseSchema = z.object({
  courses: z.array(courseSchema),
  total: z.number(),
});
