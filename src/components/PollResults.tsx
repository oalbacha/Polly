import React, { useState } from "react";
import { Choice, Poll } from "@prisma/client";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "../utils/helper";

const PollResults: React.FC<{ poll: any; votes: any }> = ({ poll, votes }) => {
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

  const width = 400;
  const half = width / 2;
  return (
    <main className="p-10">
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
                className="text-5xl font-extrabold text-gray-700 uppercas"
                fill={active.color}
                textAnchor="middle"
                dy={-20}
              >
                {active.optionText}
              </Text>
              <Text
                className="text-2xl font-extrabold text-gray-700 uppercase fill-gray-600"
                textAnchor="middle"
                dy={20}
              >
                {`${active._count} votes`}
              </Text>
            </>
          ) : (
            <>
              <Text
                className="text-5xl font-extrabold text-gray-700 uppercase fill-gray-700"
                textAnchor="middle"
                dy={-20}
              >
                {resultsArray.reduce((acc, option) => acc + option._count, 0)}
              </Text>
              <Text
                className="text-2xl font-extrabold text-gray-700 uppercase fill-gray-600"
                textAnchor="middle"
                dy={20}
              >
                Total votes
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
};

export default PollResults;
