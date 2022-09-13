import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import PublishButton from "./PublishButton";
import VoteButton from "./VoteButton";
import PollOption from "./PollOption";
import PollResults from "./PollResults";

const PollPageContent: React.FC<{ id: string }> = ({ id }) => {
  const [viewPollResults, setViewPollResults] = useState(false);
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
      <div className="flex items-start justify-between w-2/3 gap-20 p-4">
        <div className="flex gap-5 font-medium">
          {(data?.poll?.options).map((item, idx) => {
            const { vote, votes, isOwner, expired, poll, voteMetaData } = data;
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

        {Array.isArray(data.votes) && data.votes.length > 0 && (
          <div className="flex w-full flexx-col">
            {!viewPollResults && (
              <button onClick={() => setViewPollResults(true)}>
                View Results
              </button>
            )}
            {viewPollResults && (
              <PollResults
                voteMetaData={data.voteMetaData}
                poll={data.poll}
                votes={data.votes}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PollPageContent;
