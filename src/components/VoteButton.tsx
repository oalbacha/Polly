import React from "react";
import { trpc } from "../utils/trpc";

export const VoteButton: React.FC<{
  pollId: string;
  itemText: string;
  optionId: string;
}> = ({ pollId, itemText, optionId }) => {
  const {
    mutate,
    data: voteResponse,
    error: voteError,
  } = trpc.useMutation("polls.vote-on-poll", {
    onSuccess: () => window.location.reload(),
  });

  return (
    <button
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-7"
      onClick={() =>
        mutate({
          optionId,
          pollId,
        })
      }
    >
      {itemText}
    </button>
  );
};

export default VoteButton;
