import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  console.log("data :>> ", data);

  const { mutate, data: voteResponse } = trpc.useMutation(
    "questions.vote-on-poll",
    {
      onSuccess: () => window.location.reload(),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.question) {
    return <div>No questions found!</div>;
  }

  return (
    <div className="flex flex-col p-8">
      {data?.isOwner && <div>you created this poll</div>}
      <div className="text-2xl font-bold">{data?.question?.question}</div>
      <div>
        {(data?.question?.options as string[])?.map((item, idx) => {
          if (data?.isOwner || data?.vote) {
            return (
              <div
                className={data?.vote?.choice === idx ? "underline" : ""}
                key={idx}
              >
                {(item as any).option} - {data?.votes?.[idx]?._count ?? 0}{" "}
                vote(s)
              </div>
            );
          }
          return (
            <button
              key={idx}
              onClick={() =>
                mutate({ questionId: data?.question!.id, option: idx })
              }
            >
              {(item as any).option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID found!</div>;
  }

  return <QuestionPageContent id={id} />;
};

export default QuestionPage;
