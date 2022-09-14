import React, { useState } from "react";
import { Choice, Poll } from "@prisma/client";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "../utils/helper";
import moment from "moment";

const PollResults: React.FC<{
  poll: any;
  votes: any;
  voteMetaData: {
    _max: { createdAt: Date | null };
    _count: { voterToken: number; id: number };
  };
}> = ({ poll, votes, voteMetaData }) => {
  const [active, setActive] = useState<any>(null);

  // I need an array of this shape [{id, text, votes, color}]
  // so Im attempting to shape the data as needed by visx
  const resultsArray: {
    _count: number;
    color: string;
    optionText: string;
    optionId: string;
  }[] = [];

  if (Array.isArray(votes)) {
    votes.map((vote: any, i: number) => {
      let temp = poll.options.find(
        (option: { id: string }) => option.id === vote.optionId
      );
      if (temp.text) {
        vote.optionText = temp.text;
      }

      vote.color = COLORS[i];
      resultsArray.push(vote);
    });
  }

  const width = 190;
  const half = width / 2;
  return (
    <main className="flex flex-col w-1/2 gap-10">
      <div className="flex flex-col gap-3">
        <div className="ml-2">
          <h2 className="text-xl font-semibold text-gray-500">Total Votes</h2>
          <div className="text-3xl font-bold text-gray-700">
            {voteMetaData._count.id}
          </div>
        </div>

        <p className="ml-2 text-sm text-gray-500">
          Last vote was at {moment(voteMetaData._max.createdAt).format("LLL")}
        </p>
        <div className="flex items-center gap-7">
          <svg width={width} height={width}>
            <Group top={half} left={half}>
              <Pie
                data={resultsArray}
                pieValue={(data) => data._count}
                outerRadius={half}
                innerRadius={({ data }) => {
                  const size = active && active._count == data._count ? 12 : 8;
                  return half - size;
                }}
                padAngle={0.01}
              >
                {(pie) => {
                  return pie.arcs.map((arc) => {
                    return (
                      <g
                        key={arc.data.optionId}
                        onMouseEnter={() => setActive(arc.data)}
                        onMouseLeave={() => setActive(null)}
                      >
                        <path
                          d={`${pie.path(arc)}`}
                          fill={`${arc.data.color}`}
                        ></path>
                      </g>
                    );
                  });
                }}
              </Pie>
              {active ? (
                <>
                  <Text
                    className="text-3xl font-extrabold text-gray-700 uppercas"
                    fill={active.color}
                    textAnchor="middle"
                    dy={-20}
                  >
                    {active.optionText}
                  </Text>
                  <Text
                    className="text-xl font-extrabold text-gray-700 uppercase fill-gray-600"
                    textAnchor="middle"
                    dy={20}
                  >
                    {`${active._count} votes`}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    className="text-3xl font-extrabold text-gray-700 uppercase fill-gray-700"
                    textAnchor="middle"
                    dy={-20}
                  >
                    {voteMetaData._count.id}
                  </Text>
                  <Text
                    className="text-xl font-extrabold text-gray-700 uppercase fill-gray-600"
                    textAnchor="middle"
                    dy={20}
                  >
                    Total votes
                  </Text>
                </>
              )}
            </Group>
          </svg>
          <ul className="flex flex-col w-1/3 gap-1">
            {resultsArray.map((item) => {
              return (
                <div
                  className="flex items-center gap-3 tracking-wide text-gray-600"
                  key={item.optionId}
                >
                  <li
                    className="flex items-center gap-2"
                    style={{ color: `${item.color}` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={`${item.color}`}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 capitalize">
                      <span className="font-bold">{item.optionText}</span>
                      {" - "}
                      <span>{item._count} votes</span>
                    </p>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default PollResults;
