import React from "react";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC<{ query: string }> = ({ query }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: (data) => {
      console.log("data: ", data);
      client.invalidateQueries(`questions.get-all`);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log(e.currentTarget.value);
          mutate({ question: e.currentTarget.value });
        }
      }}
    ></input>
  );
};

export default QuestionCreator;
