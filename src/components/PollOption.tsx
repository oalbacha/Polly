import React from "react";
import PollResults from "./PollResults";

// for when users can't vote, i.e. owner, expired vote or voted already
const PollOption: React.FC<{
  poll: object | undefined;
  optionId: string | undefined;
  itemId: string;
  itemText: string;
  voteCount: number | undefined;
}> = ({ optionId, itemId, itemText, voteCount, poll }) => {
  return (
    <div>
      <div className={optionId === itemId ? "underline" : ""}>{itemText}</div>
    </div>
  );
};

export default PollOption;
