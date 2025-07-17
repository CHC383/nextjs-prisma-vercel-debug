import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DIRECT_URL: z.string().url().startsWith("postgres://"),
  },
  runtimeEnv: { DIRECT_URL: process.env.DIRECT_URL },
});
