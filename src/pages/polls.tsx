import React from "react";
import { NextPage } from "next";
import PollListing from "../components/PollListing";
import InfiniteListing from "../components/InfiniteListing";
import AllPolls from "../components/AllPolls";

const Polls: NextPage = () => {
  return (
    <div className="flex flex-col gap-10 w-[95%] my-7 mx-auto">
      {/* <AllPolls /> */}
      {/* <PollListing /> */}
      <InfiniteListing />
    </div>
  );
};

export default Polls;
