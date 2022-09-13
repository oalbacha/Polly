import React from "react";

const PollOption: React.FC<{
  optionId: string | undefined;
  itemId: string;
  itemText: string;
  voteCount: number | undefined;
}> = ({ optionId, itemId, itemText, voteCount }) => {
  return (
    <div className={optionId === itemId ? "underline" : ""}>
      {itemText} - {voteCount ?? 0} votes
    </div>
  );
};

export default PollOption;
