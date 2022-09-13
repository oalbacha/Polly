import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PollPageContent from "../../components/PollPageContent";

const PollPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID found!</div>;
  }

  return <PollPageContent id={id} />;
};

export default PollPage;
