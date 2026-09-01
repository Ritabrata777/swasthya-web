"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  Video, 
  VideoOff, 
  PhoneOff, 
  User, 
  X,
  AlertTriangle,
  Stethoscope
} from "lucide-react";
import LiveECG from "@/components/liveECG";

// Dynamic Header Component showing both Clinician and Patient
function DoctorHeaderInfo() {
  const searchParams = useSearchParams();
  
  const doctorName = searchParams.get("docName") || "Dr. Sharma";
  const patientName = searchParams.get("name") || "Ram";
  const age = searchParams.get("age") || "45";
  const sex = searchParams.get("sex") || "M";

  return (
    <div className="flex items-center gap-6">
      {/* Active Patient Card */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-2xl">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
          <User size={16} className="text-blue-400" />
        </div>
        <div>
          <div className="text-xs text-white/50 uppercase tracking-wider font-medium">Active Patient</div>
          <div className="text-sm font-bold text-white tracking-tight">{patientName} • {age}y • {sex}</div>
        </div>
      </div>

      {/* Logged-in Clinician */}
      <div className="flex items-center gap-2 text-xs text-white/60 border-l border-white/10 pl-6">
        <Stethoscope size={16} className="text-green-400" />
        <span>Clinician: <strong className="text-white">{doctorName}</strong></span>
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "prescription">("overview");
  const [camOn, setCamOn] = useState(true);

  // Liquid Glass Styling Constants
  const glassPanel = "relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-[24px] border border-white/15 shadow-2xl";
  const innerGlow = <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />;

  return (
    <div className="bg-[#121212] min-h-screen text-white p-4 font-sans flex flex-col gap-4 overflow-x-hidden"
         style={{ backgroundImage: "radial-gradient(at 0% 0%, #1c1c1e 0px, transparent 50%), radial-gradient(at 100% 0%, #0a2440 0px, transparent 50%), radial-gradient(at 100% 100%, #1c1c1e 0px, transparent 50%), radial-gradient(at 0% 100%, #0f2027 0px, transparent 50%)" }}>
      
      {/* Top Header Bar */}
      <header className={`${glassPanel} px-6 py-3 flex justify-between items-center`}>
        {innerGlow}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-2 text-green-400 font-mono tracking-wider bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            NODE #84 • RURAL PHC EAST • CONNECTED
          </span>
        </div>
        
        {/* Dynamic Clinician and Patient Header */}
        <Suspense fallback={<div className="h-8 w-48 bg-white/10 animate-pulse rounded" />}>
          <DoctorHeaderInfo />
        </Suspense>

        <div className="flex items-center gap-3">
          <button onClick={() => setCamOn(!camOn)} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 transition text-white">
            {camOn ? <Video size={18} /> : <VideoOff size={18} className="text-red-400" />}
          </button>
          <button className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition">
            <PhoneOff size={18} />
          </button>
        </div>
      </header>

      {/* Urgent Warning Banner */}
      <div className="bg-red-500/10 border border-red-500/30 px-6 py-3 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-red-400 font-bold">
          <AlertTriangle size={16} className="animate-bounce" />
          URGENT: Abnormal Vitals detected. Clinician review required immediately.
        </div>
        <button className="text-red-400 hover:underline font-bold">View Details &rarr;</button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        {/* LEFT AREA: 8 Columns (Video, Vitals, Hospital ECG Monitor) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          
          {/* Top Row: Video + Vitals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[300px]">
            
            {/* Video Feed */}
            <div className={`${glassPanel} h-64 lg:h-full`}>
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

            {/* Vitals Grid (Compact Cards) */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Heart Rate */}
              <div className={`${glassPanel} p-4 flex flex-col justify-between`}>
                {innerGlow}
                <h3 className="text-xs font-medium tracking-wider uppercase text-white/60">Heart Rate</h3>
                <div className="mt-1">
                  <span className="text-4xl font-semibold tracking-tight text-white drop-shadow-md">112</span>
                  <span className="text-sm text-white/60 ml-1">bpm</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 border border-red-500/50 bg-red-500/20 px-2 py-1 rounded animate-pulse">Elevated</span>
                  <span className="text-xs text-white/80 flex items-center gap-1">+12 <TrendingUp size={12} className="text-red-500" /></span>
                </div>
              </div>

              {/* SpO2 */}
              <div className={`${glassPanel} p-4 flex flex-col justify-between`}>
                {innerGlow}
                <h3 className="text-xs font-medium tracking-wider uppercase text-white/60">SPO2</h3>
                <div className="mt-1">
                  <span className="text-4xl font-semibold tracking-tight text-white drop-shadow-md">98</span>
                  <span className="text-sm text-white/60 ml-1">%</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded">Normal</span>
                  <span className="text-xs text-white/60">- - &rarr;</span>
                </div>
              </div>

              {/* Body Temp */}
              <div className={`${glassPanel} p-4 flex flex-col justify-between`}>
                {innerGlow}
                <h3 className="text-xs font-medium tracking-wider uppercase text-white/60">Body Temp</h3>
                <div className="mt-1">
                  <span className="text-4xl font-semibold tracking-tight text-white drop-shadow-md">99.4</span>
                  <span className="text-sm text-white/60 ml-1">°F</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400 border border-orange-500/50 bg-orange-500/20 px-2 py-1 rounded">Slightly Elevated</span>
                  <span className="text-xs text-white/80 flex items-center gap-1">+0.8 <TrendingUp size={12} className="text-orange-500" /></span>
                </div>
              </div>

              {/* Blood Pressure */}
              <div className={`${glassPanel} p-4 flex flex-col justify-between`}>
                {innerGlow}
                <h3 className="text-xs font-medium tracking-wider uppercase text-white/60">Blood Pressure</h3>
                <div className="mt-1">
                  <span className="text-4xl font-semibold tracking-tight text-white drop-shadow-md">130</span>
                  <span className="text-xl text-white/60">/85</span>
                  <span className="text-xs text-white/60 ml-1">mmHg</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded">Normal</span>
                  <span className="text-xs text-white/80 flex items-center gap-1">Sys +5 <TrendingUp size={12} className="text-yellow-500" /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Hospital-Grade ICU Monitor Component */}
          <div className={`${glassPanel} flex-1 p-3 min-h-[240px] flex flex-col`}>
            {innerGlow}
            <div className="flex-1 relative">
              <LiveECG />
            </div>
          </div>
        </div>

        {/* RIGHT AREA: 4 Columns (Clinical Panel & Tabs) */}
        <div className={`${glassPanel} col-span-12 lg:col-span-4 p-6 flex flex-col h-full`}>
          {innerGlow}
          
          {/* Tabs Header */}
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

          {/* Tab Content Area */}
          <div className="flex-1 relative flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-white/60 mb-3">Chief Complaint</h3>
                    <p className="text-white text-sm bg-white/5 p-4 rounded-xl border border-white/15">
                      Patient presents with severe sore throat, difficulty swallowing, and mild fever persisting for the last 48 hours. Denies cough.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-white/60 mb-3">Triage Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm bg-black/40 border border-white/10 p-3 rounded-lg">
                        <span className="text-white/60">Pain Scale</span><span className="text-red-400 font-bold">7/10</span>
                      </div>
                      <div className="flex justify-between text-sm bg-black/40 border border-white/10 p-3 rounded-lg">
                        <span className="text-white/60">Duration</span><span className="text-white font-bold">2 Days</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* HISTORY TAB */}
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-sm font-bold tracking-wider uppercase text-white/60 mb-3">Medical History</h3>
                  <ul className="list-disc list-inside text-sm text-white space-y-2 mb-6 ml-1">
                      <li>Hypertension <span className="text-white/50">(Diagnosed 2018)</span></li>
                      <li>Type 2 Diabetes <span className="text-white/50">(Diet controlled)</span></li>
                  </ul>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-white/60 mb-3">Past Encounters</h3>
                  <div className="space-y-3">
                      <div className="p-3 bg-white/5 border border-white/15 rounded-xl">
                          <div className="text-xs text-green-400 mb-1 font-bold">12 May 2026</div>
                          <div className="text-sm text-white">Routine Blood Pressure Follow-up</div>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* PRESCRIPTION TAB */}
              {activeTab === "prescription" && (
                <motion.div
                  key="prescription"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium tracking-wider uppercase text-white/60 mb-2">Primary Diagnosis</h3>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                          <ShieldCheck className="text-green-500 shrink-0" size={20} />
                          <span className="text-white font-medium text-sm">J02.9 - Acute pharyngitis, unspecified</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium tracking-wider uppercase text-white/60">Medications</h3>
                          <button onClick={() => alert("Opening drug formulary...")} className="text-xs font-bold text-green-400 hover:text-green-300 transition">+ Add Drug</button>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-black/40 border border-white/15 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-green-500 rounded-r-md shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                          <div className="flex justify-between items-start mb-3 ml-2">
                              <span className="font-bold text-white tracking-tight">Amoxicillin</span>
                              <button className="text-white/40 hover:text-red-500 transition-colors"><X size={18}/></button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 ml-2">
                              <div>
                                  <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Dose</label>
                                  <input type="text" defaultValue="1 g" className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500" />
                              </div>
                              <div>
                                  <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Freq</label>
                                  <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500 appearance-none [&>option]:text-black">
                                      <option>BID</option>
                                      <option>TID</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Duration</label>
                                  <input type="text" defaultValue="5 Days" className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500" />
                              </div>
                              <div>
                                  <label className="text-xs text-white/60 uppercase mb-1 block font-medium">Route</label>
                                  <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500 appearance-none [&>option]:text-black">
                                      <option>PO (Oral)</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>

                  {/* Safety Check & Transmit Action */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs font-bold tracking-wider uppercase text-white/60 mb-2">Safety Review</div>
                    <div className="space-y-2 mb-4 text-xs text-white/80">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded accent-green-500" /> Patient Allergies Verified Safe
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded accent-green-500" /> No Known Drug Interactions
                      </label>
                    </div>
                    <button 
                      onClick={() => alert("Prescription signed and transmitted successfully via WhatsApp/SMS!")}
                      className="w-full py-3.5 bg-green-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-400 transition"
                    >
                      Sign & Transmit Rx
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}