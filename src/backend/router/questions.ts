import * as trpc from "@trpc/server";
import { resolve } from "path";
import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";
import { createPollValidator } from "../../shared/create-poll-validator";

export const questionRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.pollQuestion.findMany();
    },
  })
  .query("get-all-mine", {
    async resolve({ ctx }) {
      if (!ctx.token) return [];
      return await prisma.pollQuestion.findMany({
        where: {
          ownerToken: {
            equals: ctx.token,
          },
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      const question = await prisma.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      });
      const myVote = await prisma.vote.findFirst({
        where: {
          questionId: input.id,
          voterToken: ctx.token,
        },
      });
      return { question, vote: myVote, isOwner: question?.ownerToken === ctx.token };
    },
  })
  .mutation("vote", {
    input: createPollValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) return { error: "Unauthorized" };
      return await prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: input.options,
          ownerToken: ctx.token,
        },
      });
    },
  });
  .mutation("create", {
    input: createPollValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) return { error: "Unauthorized" };
      return await prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: input.options,
          ownerToken: ctx.token,
        },
      });
    },
  });
