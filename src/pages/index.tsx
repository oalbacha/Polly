import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: (data) => {
      console.log("data: ", data);
      client.invalidateQueries(["questions.get-all"]);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log(e.currentTarget.value);
          mutate({ question: e.currentTarget.value });
        }
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
        {data.map((question) => (
          <div key={question.id}>{question.question}</div>
        ))}
      </div>
      <QuestionCreator />
    </div>
  );
};

export default Home;
