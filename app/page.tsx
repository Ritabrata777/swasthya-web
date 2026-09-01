"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, User, Lock, ArrowRight, Loader2, ShieldCheck, UserPlus, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const [userType, setUserType] = useState<"existing" | "new">("existing");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const isFormValid = role && name.length >= 2 && pin.length >= 4;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsAuthenticating(true);
    
    // Capture patient age and sex if present
    const ageInput = (document.getElementById("patient-age") as HTMLInputElement)?.value || "45";
    const sexInput = (document.getElementById("patient-sex") as HTMLSelectElement)?.value || "M";

    setTimeout(() => {
      const urlName = encodeURIComponent(name);
      if (role === "doctor") {
        router.push(`/doctor?docName=${urlName}`); // Points to your moved doctor dashboard
      } else {
        router.push(`/patient?name=${urlName}&age=${ageInput}&sex=${sexInput}`); // Points to patient kiosk
      }
    }, 1200);
  }

  const glassPanel = "relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-[24px] border border-white/15 shadow-2xl p-8 w-full max-w-md";

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center p-4 text-white font-sans"
         style={{ backgroundImage: "radial-gradient(at 0% 0%, #1c1c1e 0px, transparent 50%), radial-gradient(at 100% 0%, #0a2440 0px, transparent 50%), radial-gradient(at 100% 100%, #1c1c1e 0px, transparent 50%), radial-gradient(at 0% 100%, #0f2027 0px, transparent 50%)" }}>
      
      <motion.div layout className={glassPanel}>
        <motion.div layout className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <ShieldCheck size={32} className="text-white" />
          </div>
        </motion.div>
        
        <motion.h1 layout className="text-2xl font-bold text-center tracking-tight mb-2">SwasthyaKiosk Auth</motion.h1>
        <motion.p layout className="text-sm text-white/50 text-center mb-8">Select your role to access the platform</motion.p>

        {/* Role Selection */}
        <motion.div layout className="grid grid-cols-2 gap-4 mb-6">
          <button 
            type="button"
            onClick={() => setRole("patient")}
            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
              role === "patient" 
                ? "border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-blue-400" 
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
            }`}
          >
            <User size={28} />
            <span className="font-bold text-sm">Patient</span>
          </button>

          <button 
            type="button"
            onClick={() => setRole("doctor")}
            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
              role === "doctor" 
                ? "border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)] text-green-500" 
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
            }`}
          >
            <Stethoscope size={28} />
            <span className="font-bold text-sm">Clinician</span>
          </button>
        </motion.div>

        {/* Dynamic Form Area */}
        <div className="relative min-h-[120px]">
          <AnimatePresence mode="wait">
            {role ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                {/* Existing / New Toggle */}
                <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                  <button 
                    type="button"
                    onClick={() => setUserType("existing")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                      userType === "existing" ? "bg-white/15 text-white shadow-md" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <LogIn size={16} /> Existing
                  </button>
                  <button 
                    type="button"
                    onClick={() => setUserType("new")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                      userType === "new" ? "bg-white/15 text-white shadow-md" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <UserPlus size={16} /> New
                  </button>
                </div>

                <form onSubmit={handleAuth} className="flex flex-col gap-4">
                  {/* Name Input */}
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text" 
                      placeholder={role === "doctor" ? "Dr. Full Name" : "Patient Full Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-${role === "doctor" ? "green" : "blue"}-500 transition-colors`}
                    />
                  </div>

                  {/* Extra Fields for New Patients Only */}
                  {userType === "new" && role === "patient" && (
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="number" 
                        placeholder="Age"
                        id="patient-age"
                        className="w-full bg-black/40 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <select 
                        id="patient-sex"
                        className="w-full bg-black/40 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:text-black"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}

                  {/* PIN Input */}
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="password" 
                      placeholder={`4-Digit ${role === "doctor" ? "Clinician" : "Patient"} PIN`}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      className={`w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white tracking-[0.5em] focus:outline-none focus:border-${role === "doctor" ? "green" : "blue"}-500 transition-colors`}
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={!isFormValid || isAuthenticating}
                    className={`w-full mt-2 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isFormValid && !isAuthenticating
                        ? role === "doctor" 
                          ? "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                          : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        : "bg-white/10 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    {isAuthenticating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        {userType === "new" ? "Create Account" : "Access Platform"} <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="prompt"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-white/40 text-sm text-center border border-dashed border-white/10 rounded-xl bg-white/5"
              >
                Select a role above to reveal login options.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}