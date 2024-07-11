import { z } from "zod";

export const formSchema = z.object({
  deptCode: z
    .string()

    .optional(),
  courseName: z.string().optional(),
  instructor: z.string().optional(),
});
