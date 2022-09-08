import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

const Polls: NextPage = () => {
  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
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
