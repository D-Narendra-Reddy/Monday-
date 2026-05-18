"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FocusMode() {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const cycle = () => {
      setPhase("Inhale");
      setTimeout(() => {
        setPhase("Hold");
        setTimeout(() => {
          setPhase("Exhale");
        }, 2000); // Hold for 2s
      }, 4000); // Inhale for 4s
    };

    cycle();
    const interval = setInterval(cycle, 10000); // Total cycle 10s (4+2+4)

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section className="py-16 md:py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Mental Refresh</h2>
        <p className="text-slate-600 font-light max-w-md mx-auto">
          Take 10 seconds to center yourself before diving into work.
        </p>
      </div>

      <div 
        className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        {!isActive ? (
          <div className="absolute inset-0 flex items-center justify-center glass rounded-full glass-hover z-20">
            <span className="text-xl text-slate-700 font-medium">Click to Start</span>
          </div>
        ) : (
          <>
            <motion.div
              animate={{
                scale: phase === "Inhale" ? 1.5 : phase === "Hold" ? 1.5 : 1,
                opacity: phase === "Inhale" ? 0.8 : phase === "Hold" ? 0.5 : 0.2,
              }}
              transition={{
                duration: phase === "Inhale" ? 4 : phase === "Hold" ? 2 : 4,
                ease: "easeInOut",
              }}
              className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-orange-300 to-rose-300 rounded-full blur-2xl z-0"
            />
            <motion.div
              animate={{
                scale: phase === "Inhale" ? 1.2 : phase === "Hold" ? 1.2 : 1,
              }}
              transition={{
                duration: phase === "Inhale" ? 4 : phase === "Hold" ? 2 : 4,
                ease: "easeInOut",
              }}
              className="z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full glass flex items-center justify-center border-2 border-white/50 shadow-lg"
            >
              <motion.span 
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-3xl font-medium text-slate-700 tracking-wider"
              >
                {phase}
              </motion.span>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
