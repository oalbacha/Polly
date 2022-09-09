import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { formatDate } from "../utils/helper";
import { trpc } from "../utils/trpc";

const Polls: NextPage = () => {
  const { isLoading, data } = trpc.useQuery(["questions.get-all"]);
  console.log("data:", data);
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5 w-[95%] my-7 mx-auto">
      <div className="text-2xl font-bold">Questions:</div>
      {data.map((question) => (
        <Link href={`/question/${question.id}`} key={question.id}>
          <a className="block text-sm font-bold tracking-wide uppercase">
            <p>{question.question}</p>
            <p className="text-sm italic font-normal tracking-wide text-gray-500 capitalize">
              Created: {formatDate(question?.createdAt)}
            </p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Polls;
