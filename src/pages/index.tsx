import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import PollForm from "../components/PollForm";

const Home: NextPage = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: (data) => {
      console.log("data: ", data);
      client.invalidateQueries(`questions.get-all`);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <>
      <PollForm />
      {/* <input
        ref={inputRef}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log(e.currentTarget.value);
            mutate({ question: e.currentTarget.value });
          }
        }}
      ></input> */}
    </>
  );
};

export default Home;
