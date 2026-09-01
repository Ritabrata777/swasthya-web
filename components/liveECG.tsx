"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, YAxis } from "recharts";

// Generate initial dummy waveform data
const generateData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      time: i,
      value: Math.sin(i / 2) * 10 + (i % 10 === 0 ? 50 : 0) + Math.random() * 5,
    });
  }
  return data;
};

export default function LiveECG() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        const lastTime = newData[newData.length - 1].time;
        newData.push({
          time: lastTime + 1,
          value:
            Math.sin((lastTime + 1) / 2) * 10 +
            ((lastTime + 1) % 10 === 0 ? 50 : 0) +
            Math.random() * 5,
        });
        return newData;
      });
    }, 100); // Speed of the waveform

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <YAxis domain={[-20, 80]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#34C759" /* medical-safe color */
            strokeWidth={2}
            dot={false}
            isAnimationActive={false} // Disable Recharts animation for custom interval scrolling
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}