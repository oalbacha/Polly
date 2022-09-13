import React from "react";
import PollResults from "./PollResults";

const PollOption: React.FC<{
  poll: object | undefined;
  optionId: string | undefined;
  itemId: string;
  itemText: string;
  voteCount: number | undefined;
}> = ({ optionId, itemId, itemText, voteCount, poll }) => {
  return (
    <div>
      <div className={optionId === itemId ? "underline" : ""}>
        {itemText} - {voteCount ?? 0} votes
      </div>
    </div>
  );
};

export default PollOption;
