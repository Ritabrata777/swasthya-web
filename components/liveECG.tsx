"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Heart, Activity, AlertCircle } from "lucide-react";

const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 70; i++) {
    let val = 0;
    if (i % 14 === 2) val = 2.2;
    else if (i % 14 === 3) val = -0.8;
    else if (i % 14 === 4) val = 0.3;
    else val = (Math.random() - 0.5) * 0.15;
    data.push({ time: i, ecg: val, resp: Math.sin(i / 4) * 0.5 });
  }
  return data;
};

export default function LiveECG() {
  const [data, setData] = useState(generateInitialData());
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimestamp(now.toTimeString().split(' ')[0] + "." + Math.floor(now.getMilliseconds() / 100));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 100);

    const ticker = setInterval(() => {
      setData((prev) => {
        const nextTime = prev[prev.length - 1].time + 1;
        const index = nextTime % 14;
        let val = (Math.random() - 0.5) * 0.15;
        
        if (index === 2) val = 2.2;
        else if (index === 3) val = -0.8;
        else if (index === 4) val = 0.3;

        return [...prev.slice(1), { time: nextTime, ecg: val, resp: Math.sin(nextTime / 4) * 0.5 }];
      });
    }, 90);

    return () => {
      clearInterval(ticker);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#080c10] border-2 border-[#1e293b] rounded-2xl p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] font-mono relative overflow-hidden">
      
      {/* Hospital Monitor Header Bar */}
      <div className="flex justify-between items-center bg-[#111827] px-3 py-1.5 rounded-lg border border-white/10 text-xs mb-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-red-500 font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> ALARM: HIGH HR
          </span>
          <span className="text-white/45">|</span>
          <span className="text-white/80">ICU BED 04</span>
          <span className="text-white/45">|</span>
          <span className="text-green-400 font-bold">ECG LEAD II (1.0mV)</span>
        </div>
        <div className="flex items-center gap-4 text-cyan-400">
          <span>25 mm/s</span>
          <span className="text-white font-semibold">{timestamp}</span>
        </div>
      </div>

      {/* Main Telemetry Graph Area */}
      <div className="flex-1 relative grid grid-cols-12 gap-2">
        
        {/* Waveforms (8 Cols) */}
        <div className="col-span-9 flex flex-col justify-between h-full relative bg-black/40 rounded-xl border border-white/5 p-1">
          
          {/* Background Clinical Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6610_1px,transparent_1px),linear-gradient(to_bottom,#00ff6610_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* ECG Channel */}
          <div className="h-[55%] relative">
            <div className="absolute top-1 left-2 text-[10px] text-[#00ff66] font-bold z-10 flex items-center gap-1">
              <Activity size={12} /> II
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 0, left: -30, bottom: -10 }}>
                <Line type="monotone" dataKey="ecg" stroke="#00ff66" strokeWidth={2} dot={false} isAnimationActive={false} />
                <YAxis domain={[-2, 3]} hide={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Respiration Channel (Yellow) */}
          <div className="h-[35%] relative border-t border-white/5 pt-1">
            <div className="absolute top-1 left-2 text-[10px] text-[#ffea00] font-bold z-10">
              RESP
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 0, left: -30, bottom: -10 }}>
                <Line type="monotone" dataKey="resp" stroke="#ffea00" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                <YAxis domain={[-1, 1]} hide={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Numeric Parameter Side Panel (3 Cols) */}
        <div className="col-span-3 flex flex-col justify-between gap-1">
          
          {/* HR Box */}
          <div className="bg-[#111827]/90 border border-[#00ff66]/30 rounded-xl p-2 flex flex-col justify-center">
            <span className="text-[10px] text-[#00ff66] font-bold flex justify-between">
              <span>HR</span> <Heart size={10} className="text-[#00ff66] animate-ping" />
            </span>
            <div className="text-2xl font-bold text-[#00ff66] tracking-tight">112</div>
            <span className="text-[9px] text-white/50">bpm</span>
          </div>

          {/* SpO2 Box (Cyan) */}
          <div className="bg-[#111827]/90 border border-cyan-500/30 rounded-xl p-2 flex flex-col justify-center">
            <span className="text-[10px] text-cyan-400 font-bold">SpO2</span>
            <div className="text-2xl font-bold text-cyan-400 tracking-tight">98</div>
            <span className="text-[9px] text-white/50">%</span>
          </div>

          {/* NIBP Box (Orange/White) */}
          <div className="bg-[#111827]/90 border border-orange-500/30 rounded-xl p-2 flex flex-col justify-center">
            <span className="text-[10px] text-orange-400 font-bold">NIBP</span>
            <div className="text-lg font-bold text-white tracking-tight">130/85</div>
            <span className="text-[9px] text-orange-400">mmHg (SYS)</span>
          </div>

        </div>

      </div>
    </div>
  );
}