import { z } from "zod";

const privateEnvSchema = z.object({
  MONGODB_URI: z.string(),
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  MONGODB_URI: process.env.MONGODB_URI!,
};

privateEnvSchema.parse(privateEnv);
