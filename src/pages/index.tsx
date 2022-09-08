import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import PollForm from "../components/PollForm";

const Home: NextPage = () => {
  return <PollForm />;
};

export default Home;
