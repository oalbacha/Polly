import React from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import moment from "moment";

// published and drafts
const AllPolls = () => {
  const { isLoading, data } = trpc.useQuery(["polls.get-all"]);
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div>
      <div className="mb-3 text-4xl font-extrabold">Published Polls:</div>
      <div className="flex flex-col gap-5">
        {data.map((poll) => (
          <Link key={poll.id} href={`/poll/${poll.id}`}>
            <a className="flex flex-col gap-1">
              <p className="font-bold tracking-wide uppercase">{poll.text}</p>
              <p className="text-sm italic font-thin">
                {moment(poll.createdAt).format("LL")}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllPolls;
