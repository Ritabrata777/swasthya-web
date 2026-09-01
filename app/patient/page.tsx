"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Thermometer, 
  Wind, 
  HeartPulse, 
  Bot, 
  Send, 
  CheckCircle2, 
  Wifi, 
  Loader2 
} from "lucide-react";

function PatientHeader() {
  const searchParams = useSearchParams();
  const patientName = searchParams.get("name") || "Patient";

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
        Welcome, {patientName}
      </h1>
      <p className="text-sm text-white/60">SwasthyaKiosk • Select a test to begin</p>
    </div>
  );
}

export default function PatientDashboard() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [chatInput, setChatInput] = useState("");
  
  // Simulated Chat State
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Namaste! I am your Swasthya AI assistant. Please select a test from the left, and I will guide you on how to place the sensors." }
  ]);

  const handleTestSelection = (testId: string, testName: string) => {
    setSelectedTest(testId);
    setTestComplete(false);
    // AI automatically responds when a test is selected
    setMessages(prev => [
      ...prev, 
      { sender: "ai", text: `You selected ${testName}. Please locate the ${testName} sensor on the kiosk and attach it as shown on the screen. Let me know when you are ready!` }
    ]);
  };

  const handleStartTest = () => {
    setIsTesting(true);
    setMessages(prev => [...prev, { sender: "ai", text: "Starting measurement... Please sit still and breathe normally." }]);
    
    // Simulate IoT Hardware Delay (e.g., waiting for ESP32)
    setTimeout(() => {
      setIsTesting(false);
      setTestComplete(true);
      setMessages(prev => [...prev, { sender: "ai", text: "✅ Test complete! Your results have been securely sent to the doctor." }]);
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: chatInput }]);
    setChatInput("");
    // Simulate AI thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "ai", text: "I understand. I am logging this information for the doctor." }]);
    }, 1000);
  };

  const glassPanel = "relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-[24px] border border-white/15 shadow-2xl";

  const tests = [
    { id: "ecg", name: "ECG / Heart Rhythm", icon: <Activity size={32} />, color: "text-green-500", border: "border-green-500" },
    { id: "spo2", name: "Oxygen Level (SpO2)", icon: <Wind size={32} />, color: "text-blue-400", border: "border-blue-400" },
    { id: "temp", name: "Body Temperature", icon: <Thermometer size={32} />, color: "text-orange-400", border: "border-orange-400" },
    { id: "bp", name: "Blood Pressure", icon: <HeartPulse size={32} />, color: "text-red-400", border: "border-red-400" },
  ];

  return (
    <div className="bg-[#121212] min-h-screen text-white p-4 lg:p-8 font-sans flex flex-col gap-6" 
         style={{ backgroundImage: "radial-gradient(at 0% 0%, #1c1c1e 0px, transparent 50%), radial-gradient(at 100% 0%, #0a2440 0px, transparent 50%), radial-gradient(at 100% 100%, #1c1c1e 0px, transparent 50%), radial-gradient(at 0% 100%, #0f2027 0px, transparent 50%)" }}>
      
      {/* Patient Header */}
      <header className={`${glassPanel} px-8 py-4 flex justify-between items-center`}>
        <Suspense fallback={<div className="h-12 w-48 bg-white/10 animate-pulse rounded-lg" />}>
          <PatientHeader />
        </Suspense>
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
          <Wifi className="text-green-500 animate-pulse" size={18} />
          <span className="text-sm font-bold text-green-400">Sensors Connected</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-[calc(100vh-140px)]">
        
        {/* Left Col: Test Selection & Hardware Status */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          
          {/* Test Grid */}
          <div className="grid grid-cols-2 gap-4">
            {tests.map((test) => (
              <motion.button
                key={test.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTestSelection(test.id, test.name)}
                className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center ${
                  selectedTest === test.id 
                    ? `${test.border} bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]` 
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className={`${test.color}`}>{test.icon}</div>
                <span className="font-bold text-lg">{test.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Action Area */}
          <AnimatePresence mode="wait">
            {selectedTest && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className={`${glassPanel} p-8 flex flex-col items-center justify-center flex-1 text-center`}
              >
                {!isTesting && !testComplete ? (
                  <>
                    <h2 className="text-xl font-bold mb-2">Ready to Measure</h2>
                    <p className="text-white/60 mb-6 max-w-md">Ensure the sensor is placed correctly as per the AI instructions, then press start.</p>
                    <button 
                      onClick={handleStartTest}
                      className="px-10 py-4 bg-green-500 text-black font-bold rounded-full text-lg shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 transition-transform"
                    >
                      Start Measurement
                    </button>
                  </>
                ) : isTesting ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="text-green-500 animate-spin" />
                    <h2 className="text-xl font-bold text-green-400 animate-pulse">Reading Vitals...</h2>
                    <p className="text-white/60">Please remain still.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <CheckCircle2 size={64} className="text-green-500" />
                    <h2 className="text-2xl font-bold text-white">Measurement Complete</h2>
                    <p className="text-white/60">Data has been transmitted to Dr. Sharma.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Col: AI Assistant Chat */}
        <div className={`${glassPanel} col-span-12 lg:col-span-5 flex flex-col h-full overflow-hidden`}>
          <div className="p-4 border-b border-white/15 bg-white/5 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-full border border-blue-500/50">
              <Bot className="text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">Swasthya AI Guide</h3>
              <p className="text-xs text-blue-400">Online & Ready to Help</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: msg.sender === "ai" ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.sender === "ai" 
                    ? "bg-white/10 border border-white/15 self-start rounded-tl-none" 
                    : "bg-blue-600 text-white self-end rounded-tr-none shadow-lg"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/15 bg-black/40">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about symptoms or sensors..." 
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                type="submit" 
                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}