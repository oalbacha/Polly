import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";
import superjson from "superjson";
import { createRouter } from "./context";
import { pollRouter } from "./polls";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("polls.", pollRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
