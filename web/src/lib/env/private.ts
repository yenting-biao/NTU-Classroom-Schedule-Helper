import { z } from "zod";

const privateEnvSchema = z.object({
  MONGO_URI: z.string(),
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  MONGO_URI: process.env.MONGO_URI!,
};

privateEnvSchema.parse(privateEnv);
