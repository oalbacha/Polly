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
      className="w-24 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-7"
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
