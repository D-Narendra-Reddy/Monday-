"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";

export default function Hero() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const greetings = [
    "Happy Monday Harshi ☀️",
    "New week. Fresh energy.",
    "Let's make today meaningful.",
  ];

  const [currentGreeting, setCurrentGreeting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Sun Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] bg-gradient-to-b from-orange-400/30 to-rose-400/0 rounded-full blur-3xl animate-sunrise pointer-events-none" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/60 rounded-full blur-[1px] animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${100 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center space-y-6 md:space-y-8 max-w-4xl glass p-6 sm:p-8 md:p-12 rounded-3xl mx-4"
      >
        <div className="flex items-center justify-center space-x-3 text-orange-600 mb-2 md:mb-4">
          <Sun className="w-8 h-8 animate-spin-slow" />
          <span className="text-2xl font-medium tracking-wide">{time}</span>
        </div>

        <div className="h-32 flex items-center justify-center">
          <motion.h1
            key={currentGreeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-600 drop-shadow-sm leading-tight"
          >
            {greetings[currentGreeting]}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Take a deep breath. You are capable, prepared, and ready to conquer
          this week. Start with one small step.
        </motion.p>
      </motion.div>
    </section>
  );
}
