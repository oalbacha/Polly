import * as trpc from "@trpc/server";
import { resolve } from "path";
import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";
import { createPollValidator } from "../../shared/create-poll-validator";
import { shuffle } from "../../utils/helper";

export const pollRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.poll.findMany({
        select: {
          text: true,
          id: true,
          createdAt: true,
          ownerToken: true,
        },
      });
    },
  })
  .query("get-infinite", {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
    }),
    async resolve({ input }) {
      const limit = input.limit ?? 5;
      const { cursor } = input;
      const items = await prisma.poll.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      console.log("length", items);
      return {
        items,
        nextCursor,
      };
    },
  })
  .query("get-all-published", {
    async resolve() {
      return await prisma.poll.findMany({
        select: {
          text: true,
          id: true,
          createdAt: true,
          isPublished: true,
          endsAt: true,
        },
        where: {
          isPublished: true,
        },
      });
    },
  })
  .query("get-all-mine", {
    async resolve({ ctx }) {
      if (!ctx.token) return [];
      return await prisma.poll.groupBy({
        by: ["isPublished", "text", "id", "createdAt", "endsAt"],
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
      const poll = await prisma.poll.findFirst({
        where: {
          id: input.id,
        },
        include: {
          options: true,
        },
      });

      const myVote = await prisma.choice.findFirst({
        where: {
          voterToken: ctx.token,
          pollId: input.id,
        },
      });
      const today = new Date();

      const rest = {
        poll,
        vote: myVote,
        expired: poll?.endsAt && poll?.endsAt?.getTime() < Date.now(),
        isOwner: poll?.ownerToken === ctx.token,
        votes: undefined,
      };

      if (rest.isOwner || rest.vote) {
        const votes = await prisma.choice.groupBy({
          by: ["optionId"],
          where: {
            pollId: input.id,
          },
          _count: true,
        });

        return {
          ...rest,
          votes,
        };
      }
      shuffle(poll?.options);
      return { ...rest };
    },
  })
  .mutation("create", {
    input: createPollValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");
      return await prisma.poll.create({
        data: {
          text: input.text,
          ownerToken: ctx.token,
          endsAt: input.endsAt,
          options: {
            create: input.options,
          },
        },
        include: {
          options: true,
        },
      });
    },
  })
  .mutation("publish", {
    input: z.object({
      id: z.string(),
      isPublished: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");
      return await prisma.poll.update({
        where: {
          id: input.id,
        },
        data: {
          isPublished: true,
        },
      });
    },
  })
  .mutation("vote-on-poll", {
    input: z.object({
      optionId: z.string(),
      pollId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) return { error: "Unauthorized" };
      return await prisma.choice.create({
        data: {
          voterToken: ctx.token,
          pollId: input.pollId,
          optionId: input.optionId,
        },
      });
    },
  });
