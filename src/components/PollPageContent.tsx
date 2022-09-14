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
    <div className="flex flex-col gap-3 p-8">
      {data?.isOwner && (
        <div className="w-32 text-center bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">
          You own this poll
        </div>
      )}
      {data?.expired && (
        <div className="w-28 text-center bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
          Poll has ended
        </div>
      )}
      {data?.isOwner && !data?.poll.isPublished && !data.expired && (
        <PublishButton id={data.poll.id} />
      )}
      <div className="text-2xl font-bold">{data?.poll?.text}</div>
      <div className="flex items-start justify-between w-[80%] gap-20 p-4">
        <div className="flex gap-5 font-medium">
          {(data?.poll?.options).map((item, idx) => {
            const { vote, votes, isOwner, expired, poll, voteMetaData } = data;
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
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-7"
                onClick={() => setViewPollResults(true)}
              >
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
