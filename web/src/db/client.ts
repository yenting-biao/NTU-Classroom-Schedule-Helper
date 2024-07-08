import { privateEnv } from "@/lib/env/private";
import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(privateEnv.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 5,
});
