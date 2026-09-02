"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, 
  WifiOff, 
  Bot, 
  X, 
  Send, 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  CheckCircle2, 
  Sparkles,
  Cpu
} from "lucide-react";
import LiveECG from "@/components/liveECG";

function PatientHeader() {
  const searchParams = useSearchParams();
  const patientName = searchParams.get("name") || "Patient";
  const age = searchParams.get("age") || "45";
  const sex = searchParams.get("sex") || "M";
  
  const [patientId, setPatientId] = React.useState("SK-8492");

  React.useEffect(() => {
    // Generate the random ID safely only on the client browser
    setPatientId(`SK-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-white">
        Welcome, {patientName}
      </h1>
      <p className="text-xs text-white/60">ID: {patientId} • {age}y • {sex}</p>
    </div>
  );
}

export default function PatientDashboard() {
  const [deviceId, setDeviceId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! I am your AI Health Assistant. Select a test or ask me any question about your vitals." }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const glassPanel = "relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-[24px] border border-white/15 shadow-2xl";
  const innerGlow = <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />;

  const handleDeviceToggle = () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      if (!deviceId) return;
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 1000);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { sender: "bot", text: "I have recorded your request. Your vitals are actively streaming to the doctor's screen." }
      ]);
    }, 1000);
  };

  const tests = [
    { id: "ecg", name: "ECG Test", icon: <Activity size={28} />, color: "text-green-400", border: "border-green-500/40" },
    { id: "bp", name: "Blood Pressure", icon: <Heart size={28} />, color: "text-red-400", border: "border-red-500/40" },
    { id: "temp", name: "Body Temp", icon: <Thermometer size={28} />, color: "text-orange-400", border: "border-orange-500/40" },
    { id: "spo2", name: "SpO2 & Pulse", icon: <Droplets size={28} />, color: "text-cyan-400", border: "border-cyan-500/40" },
  ];

  return (
    /* Touch Action & Scroll Container Fix */
    <div className="bg-[#121212] min-h-screen w-full text-white p-4 font-sans flex flex-col gap-4 overflow-y-scroll touch-pan-y relative"
         style={{ backgroundImage: "radial-gradient(at 0% 0%, #1c1c1e 0px, transparent 50%), radial-gradient(at 100% 0%, #0a2440 0px, transparent 50%), radial-gradient(at 100% 100%, #1c1c1e 0px, transparent 50%), radial-gradient(at 0% 100%, #0f2027 0px, transparent 50%)" }}>
      
      {/* Header Bar */}
      <header className={`${glassPanel} px-6 py-3 flex flex-wrap justify-between items-center gap-4 shrink-0`}>
        {innerGlow}
        <Suspense fallback={<div className="h-10 w-32 bg-white/10 animate-pulse rounded-lg" />}>
          <PatientHeader />
        </Suspense>

        <div className="flex items-center gap-2 bg-black/40 border border-white/15 p-1.5 rounded-2xl">
          <Cpu size={16} className="text-blue-400 ml-2" />
          <input 
            type="text" 
            placeholder="Device ID (e.g. ESP32-01)"
            value={deviceId}
            disabled={isConnected}
            onChange={(e) => setDeviceId(e.target.value)}
            className="bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none w-36 px-1 disabled:opacity-50"
          />
          <button 
            onClick={handleDeviceToggle}
            disabled={!deviceId && !isConnected}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              isConnected
                ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                : deviceId
                  ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {isConnecting ? "Pairing..." : isConnected ? "Disconnect" : "Connect"}
          </button>
        </div>

        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold transition-all ${
          isConnected 
            ? "bg-green-500/10 border-green-500/30 text-green-400" 
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {isConnected ? (
            <>
              <Wifi className="animate-pulse" size={16} />
              <span>Device Connected</span>
            </>
          ) : (
            <>
              <WifiOff size={16} />
              <span>Device Disconnected</span>
            </>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col gap-4 pb-20">
        
        <div className={`${glassPanel} p-6 flex flex-col gap-4`}>
          {innerGlow}
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Select Diagnostic Test</h2>
            <p className="text-xs text-white/50 mb-6">Touch any card below to initiate sensor telemetry streaming.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tests.map((test) => (
                <div 
                  key={test.id}
                  onClick={() => setActiveTest(test.id)}
                  className={`p-5 rounded-2xl bg-white/5 border ${test.border} hover:bg-white/10 transition-all cursor-pointer flex flex-col justify-between h-36 relative group ${
                    activeTest === test.id ? "ring-2 ring-blue-500 bg-white/10" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`${test.color}`}>{test.icon}</div>
                    <CheckCircle2 size={16} className={`${activeTest === test.id ? "text-blue-400" : "text-white/20"} transition-colors`} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">{test.name}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">
                      {activeTest === test.id ? "Streaming Live" : "Ready to Stream"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fully Touch-Pass ECG Telemetry Wrapper */}
          <AnimatePresence>
            {activeTest === "ecg" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 320 }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-col gap-2 shrink-0 overflow-hidden"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-green-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    LIVE TELEMETRY STREAMING
                  </span>
                  <button 
                    onClick={() => setActiveTest(null)}
                    className="text-white/40 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <X size={14} /> Close Monitor
                  </button>
                </div>

                {/* Responsive container with auto-overflow */}
                <div className="h-[360px] w-full rounded-2xl overflow-y-auto border border-green-500/30 touch-auto">
                  <LiveECG />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center gap-3 mt-2">
            <Sparkles className="text-yellow-400 shrink-0" size={20} />
            <p className="text-xs text-white/70">
              Ensure physical probes are connected firmly to the patient before starting diagnostic tests.
            </p>
          </div>
        </div>

      </main>

      {/* Round AI Floating Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-all z-50 hover:scale-105 active:scale-95"
      >
        {isChatOpen ? <X size={24} /> : <Bot size={28} />}
      </button>

      {/* Floating AI Popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 w-80 sm:w-96 ${glassPanel} p-4 flex flex-col h-[420px] z-50 shadow-2xl border border-white/20`}
          >
            {innerGlow}
            
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center">
                  <Bot size={16} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Clinical AI Assistant</h3>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 my-2">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white/10 text-white/90 border border-white/10 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-white/10">
              <input 
                type="text" 
                placeholder="Ask AI assistant..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}