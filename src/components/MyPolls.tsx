import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { trpc } from "../utils/trpc";

const MyPolls: NextPage = () => {
  const { isLoading, data } = trpc.useQuery(["polls.get-all-mine"]);
  console.log("data:", data);
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <div className="mb-3 text-4xl font-extrabold">My Polls:</div>
        <div className="flex flex-col gap-5">
          {data.map((poll) => (
            <Link key={poll.id} href={`/poll/${poll.id}`}>
              <a className="flex flex-col gap-1">
                <p
                  className={
                    poll.isPublished
                      ? "block text-sm font-bold tracking-wide uppercase"
                      : "block text-sm font-bold tracking-wide uppercase text-red-400"
                  }
                >
                  {poll.text}
                </p>
                <p className="text-sm italic font-thin">
                  {moment(poll.createdAt).format("LL")}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPolls;
