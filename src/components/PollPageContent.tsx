import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import PublishButton from "./PublishButton";
import VoteButton from "./VoteButton";
import PollOption from "./PollOption";
import PollResults from "./PollResults";

const PollPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, isError, error } = trpc.useQuery([
    "polls.get-by-id",
    { id },
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) console.error(`Error: ${error.message}`);
  if (!data || !data.poll) return <div>No polls found!</div>;

  return (
    <div className="flex flex-col p-8">
      {data?.isOwner && <div>You created this poll</div>}
      {data?.expired && <div>This poll has ended</div>}
      {data?.isOwner && !data?.poll.isPublished && (
        <PublishButton id={data.poll.id} />
      )}
      <div className="text-2xl font-bold">{data?.poll?.text}</div>
      <div className="flex gap-5 font-medium">
        {(data?.poll?.options).map((item, idx) => {
          const { vote, votes, isOwner, expired, poll } = data;
          console.log("data:", data);
          if (vote || isOwner || expired) {
            return (
              <PollOption
                poll={poll as object}
                key={idx}
                optionId={vote?.optionId}
                itemId={item.id}
                itemText={item.text}
                voteCount={votes?.[idx]?._count}
              />
            );
          } else {
            return (
              <VoteButton
                key={idx}
                itemText={item.text}
                pollId={poll?.id as string}
                optionId={item.id}
              />
            );
          }
        })}
      </div>
      <PollResults poll={data.poll} votes={data.votes} />
    </div>
  );
};

export default PollPageContent;
