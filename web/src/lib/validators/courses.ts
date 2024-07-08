import { z } from "zod";

export const courseTimeSchema = z.object({
  weeks: z.array(z.number()),
  day: z.number(),
  start_time: z.string(),
  end_time: z.string(),
});

export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  instructor: z.string(),
  room: z.string(),
  time: z.array(courseTimeSchema),
});
