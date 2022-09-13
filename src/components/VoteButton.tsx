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
