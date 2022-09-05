import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const { mutate } = trpc.useMutation("questions.create");

  return (
    <input
      onSubmit={(e) => {
        console.log(e.currentTarget.value);
      }}
    ></input>
  );
};

const Home: NextPage = () => {
  const { isLoading, data } = trpc.useQuery(["questions.get-all"]);
  console.log("data:", data);
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <div className="text-2xl font-bold">Questions:</div>
        {data[0]?.question}
      </div>
      <QuestionCreator />
    </div>
  );
};

export default Home;
