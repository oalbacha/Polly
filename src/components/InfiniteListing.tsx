import React from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import moment from "moment";
import { useInView } from "react-intersection-observer";

function InfiniteListing() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = trpc.useInfiniteQuery(
    [
      "polls.get-infinite",
      {
        limit: 1,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Polls</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              className="p-1 text-gray-700 border-2 border-gray-400 rounded-md"
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div>
          {data?.pages.map((page) => (
            <React.Fragment key={page.nextCursor}>
              {page.items.map((poll) => (
                <p key={poll.id}>{poll.text}</p>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              className="p-1 text-gray-700 border-2 border-gray-400 rounded-md"
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default InfiniteListing;
