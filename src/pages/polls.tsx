import React from "react";
import { NextPage } from "next";
import MyPolls from "../components/MyPolls";
import PollListing from "../components/PollListing";
import InfiniteListing from "../components/InfiniteListing";
import AllPolls from "../components/AllPolls";

const Polls: NextPage = () => {
  return (
    <div className="flex flex-col gap-10 w-[95%] my-7 mx-auto">
      {/* <AllPolls /> */}
      <PollListing />
      <MyPolls />
      {/* <InfiniteListing /> */}
    </div>
  );
};

export default Polls;
