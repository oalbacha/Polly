import type { NextPage } from "next";
import Head from "next/head";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const Home: NextPage = (props: any) => {
  const { isLoading, data } = trpc.useQuery(["getAllQuestions"]);
  console.log("data:", data);
  if (isLoading || !data) {
    <div>Loading...</div>;
  }
  return <div>{data ? <div>{data[0]?.question}</div> : null}</div>;
};

export default Home;
