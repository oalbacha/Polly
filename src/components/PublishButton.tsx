import React from "react";
import { trpc } from "../utils/trpc";

const Publish: React.FC<{ id: string }> = ({ id }) => {
  const { mutate, error, isError, isLoading } = trpc.useMutation(
    "polls.publish",
    {
      onSuccess: () => window.location.reload(),
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(`Error: ${error.message}`);
  }
  return (
    <button
      onClick={() =>
        mutate({
          id: id,
          isPublished: true,
        })
      }
    >
      Publish
    </button>
  );
};

export default Publish;
