import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  if (!isLoading && !data) {
    return <div>No questions found!</div>;
  }

  return (
    <div className="flex flex-col p-8">
      {data?.isOwner && <div>you created this poll</div>}
      <div className="text-2xl font-bold">{data?.question?.question}</div>
      <div>
        {(data?.question?.options as string[])?.map((option) => (
          <div key={option}>{option}</div>
        ))}
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
