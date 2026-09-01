"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  FileSignature,
} from "lucide-react";
import LiveECG from "../components/liveECG";

export default function SwasthyaDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "prescription">("prescription");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  
  const [allergyChecked, setAllergyChecked] = useState(false);
  const [interactionChecked, setInteractionChecked] = useState(false);
  const isFormValid = allergyChecked && interactionChecked;

  // Handle Prescription Submission
  const handleSubmitRx = () => {
    if (isFormValid) {
      alert("✅ Prescription cryptographically signed and transmitted to pharmacy.");
      setAllergyChecked(false);
      setInteractionChecked(false);
    }
  };

  // Reusable Glass Panel Class
  const glassPanel = "relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-[24px] border border-white/15 shadow-2xl";
  const innerGlow = <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />;

  return (
    <div className="bg-[#121212] min-h-screen text-white p-4 font-sans flex flex-col gap-4" 
         style={{ backgroundImage: "radial-gradient(at 0% 0%, #1c1c1e 0px, transparent 50%), radial-gradient(at 100% 0%, #0a2440 0px, transparent 50%), radial-gradient(at 100% 100%, #1c1c1e 0px, transparent 50%), radial-gradient(at 0% 100%, #0f2027 0px, transparent 50%)" }}>
      
      {/* Header */}
      <header className="relative overflow-hidden rounded-full bg-white/5 backdrop-blur-[24px] border border-white/15 shadow-2xl px-6 py-3 flex justify-between items-center">
        {innerGlow}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-white/70">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span>Node #84 - Rural PHC East</span>
            <span className="text-white/40">•</span>
            <span className="text-green-500 font-bold">Connected</span>
            <span className="text-white/40">- 24ms</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white drop-shadow-md">Rajesh K.</h1>
            <div className="text-xs font-medium tracking-wider uppercase text-white/70 flex items-center gap-2">
              ID: W-9821 • 52y • M
              <span className="text-red-400 border border-red-500/50 bg-red-500/20 px-2 py-0.5 rounded-full font-bold">
                Allergies: Penicillin
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors ${
              micOn ? "bg-white/10 border-white/20 text-white" : "bg-red-500/20 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            }`}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCamOn(!camOn)}
            className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors ${
              camOn ? "bg-white/10 border-white/20 text-white" : "bg-red-500/20 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            }`}
          >
            {camOn ? <Video size={20} /> : <VideoOff size={20} />}
          </motion.button>

          <motion.button
            onClick={() => alert("Call Ended and logged to EMR.")}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-400 font-bold flex items-center gap-2 transition-all"
          >
            <PhoneOff size={20} />
            End Call
          </motion.button>
        </div>
      </header>

      {/* Urgent Alert Bar */}
      <div className="relative overflow-hidden rounded-2xl bg-red-500/10 backdrop-blur-[24px] border border-red-500/40 shadow-2xl px-6 py-3 flex justify-between items-center">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="flex items-center gap-3 text-white font-medium">
          <AlertTriangle className="text-red-500 animate-pulse" size={20} />
          <span>URGENT: Abnormal Vitals detected. Clinician review required immediately.</span>
        </div>
        <button onClick={() => alert("Opening detailed vitals timeline...")} className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
          View Details <ArrowRight size={16} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        {/* Left Col: Video & ECG */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className={`${glassPanel} h-64 lg:h-[350px]`}>
            {innerGlow}
            {camOn ? (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544098485-2a2ed6da40ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <VideoOff size={48} className="text-white/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
          </div>

          <div className={`${glassPanel} flex-1 p-4 min-h-[150px] flex flex-col`}>
            {innerGlow}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-bold tracking-wider uppercase text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                ECG LEAD II
              </div>
              <div className="text-xs text-white/50 uppercase">25MM/S 10MM/MV</div>
            </div>
            <div className="flex-1 border-t border-white/10 relative overflow-hidden -mx-4 -mb-4 pt-2">
              <LiveECG />
            </div>
          </div>
        </div>

        {/* Middle Col: Vitals Grid */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
          {/* Heart Rate */}
          <div className={`${glassPanel} p-5 flex flex-col justify-between`}>
            {innerGlow}
            <h3 className="text-sm font-medium tracking-wider uppercase text-white/60">Heart Rate</h3>
            <div className="mt-2">
              <span className="text-5xl font-semibold tracking-tight text-white drop-shadow-md">112</span>
              <span className="text-lg text-white/60 ml-1">bpm</span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 border border-red-500/50 bg-red-500/20 px-2 py-1 rounded animate-pulse">Elevated</span>
              <span className="text-sm text-white/80 flex items-center gap-1">+12 <TrendingUp size={14} className="text-red-500" /></span>
            </div>
          </div>

          {/* SpO2 */}
          <div className={`${glassPanel} p-5 flex flex-col justify-between`}>
            {innerGlow}
            <h3 className="text-sm font-medium tracking-wider uppercase text-white/60">SPO2</h3>
            <div className="mt-2">
              <span className="text-5xl font-semibold tracking-tight text-white drop-shadow-md">98</span>
              <span className="text-lg text-white/60 ml-1">%</span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded">Normal</span>
              <span className="text-sm text-white/60">- - &rarr;</span>
            </div>
          </div>

          {/* Body Temp */}
          <div className={`${glassPanel} p-5 flex flex-col justify-between`}>
            {innerGlow}
            <h3 className="text-sm font-medium tracking-wider uppercase text-white/60">Body Temp</h3>
            <div className="mt-2">
              <span className="text-5xl font-semibold tracking-tight text-white drop-shadow-md">99.4</span>
              <span className="text-lg text-white/60 ml-1">°F</span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400 border border-orange-500/50 bg-orange-500/20 px-2 py-1 rounded">Slightly Elevated</span>
              <span className="text-sm text-white/80 flex items-center gap-1">+0.8 <TrendingUp size={14} className="text-orange-500" /></span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className={`${glassPanel} p-5 flex flex-col justify-between`}>
            {innerGlow}
            <h3 className="text-sm font-medium tracking-wider uppercase text-white/60">Blood Pressure</h3>
            <div className="mt-2">
              <span className="text-5xl font-semibold tracking-tight text-white drop-shadow-md">130</span>
              <span className="text-2xl text-white/60">/85</span>
              <span className="text-sm text-white/60 ml-1">mmHg</span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded">Normal</span>
              <span className="text-sm text-white/80 flex items-center gap-1">Sys +5 <TrendingUp size={14} className="text-yellow-500" /></span>
            </div>
          </div>
        </div>

        {/* Right Col: Clinical Panel */}
        <div className={`${glassPanel} col-span-12 lg:col-span-4 p-6 flex flex-col h-full`}>
          {innerGlow}
          
          {/* Tabs */}
          <div className="flex border-b border-white/15 mb-6">
            {["overview", "history", "prescription"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-sm font-bold capitalize transition-colors border-b-2 ${
                  activeTab === tab ? "text-white border-green-500" : "text-white/40 border-transparent hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content (Framer Motion) */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {activeTab === "prescription" && (
                <motion.div
                  key="prescription"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  <div className="mb-6">
                    <h3 className="text-sm font-medium tracking-wider uppercase text-white/60 mb-3">Primary Diagnosis</h3>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        <ShieldCheck className="text-green-500" size={20} />
                        <span className="text-white font-medium text-sm">J02.9 - Acute pharyngitis, unspecified</span>
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/60">Medications</h3>
                        <button onClick={() => alert("Opening drug formulary search...")} className="text-xs font-bold text-green-400 hover:text-green-300 transition">+ Add Drug</button>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-black/40 border border-white/15 relative">
                        <div className="absolute left-0 top-4 bottom-4 w-1 bg-green-500 rounded-r-md shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                        <div className="flex justify-between items-start mb-4 ml-2">
                            <span className="font-bold text-white tracking-tight">Amoxicillin</span>
                            <button className="text-white/40 hover:text-red-500 transition-colors"><X size={18}/></button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 ml-2">
                            <div>
                                <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Dose</label>
                                <input type="text" defaultValue="1 g" className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Freq</label>
                                <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors appearance-none [&>option]:text-black">
                                    <option>BID</option>
                                    <option>TID</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Duration</label>
                                <input type="text" defaultValue="5 Days" className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Route</label>
                                <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors appearance-none [&>option]:text-black">
                                    <option>PO (Oral)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Always Visible Action Footer for Prescription */}
          {activeTab === "prescription" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto pt-4 border-t border-white/15">
              <h3 className="text-sm font-bold tracking-wider uppercase text-white/80 mb-3 flex items-center gap-2">
                <Check size={16} className={isFormValid ? "text-green-500" : "text-red-500"} /> Safety Review
              </h3>
              
              <div className="space-y-4 mb-6">
                
                {/* Allergy Checkbox */}
                <label className="flex items-center gap-3 text-sm text-white cursor-pointer group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all border ${
                    allergyChecked 
                      ? "bg-green-500 border-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                      : "bg-red-500/20 border-red-500/60 text-transparent group-hover:border-red-400"
                  }`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <input type="checkbox" className="hidden" checked={allergyChecked} onChange={(e) => setAllergyChecked(e.target.checked)} />
                  <span>Patient Allergies (<span className="text-red-400 font-bold">Penicillin</span>) verified safe</span>
                </label>

                {/* Interaction Checkbox */}
                <label className="flex items-center gap-3 text-sm text-white cursor-pointer group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all border ${
                    interactionChecked 
                      ? "bg-green-500 border-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                      : "bg-red-500/20 border-red-500/60 text-transparent group-hover:border-red-400"
                  }`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <input type="checkbox" className="hidden" checked={interactionChecked} onChange={(e) => setInteractionChecked(e.target.checked)} />
                  <span>No Known Drug Interactions detected</span>
                </label>

              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmitRx}
                disabled={!isFormValid}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.95 } : {}}
                className={`w-full px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 border ${
                  isFormValid 
                    ? "bg-green-500 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                    : "bg-red-500/10 border-red-500/30 text-red-500/60 cursor-not-allowed"
                }`}
              >
                <FileSignature size={18} />
                {isFormValid ? "Sign & Transmit Rx" : "Complete Safety Review First"}
              </motion.button>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}