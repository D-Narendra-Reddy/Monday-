"use client";

import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import EnergyCards from "@/components/EnergyCards";
import FocusMode from "@/components/FocusMode";
import MotivationCarousel from "@/components/MotivationCarousel";
import OfficeMood from "@/components/OfficeMood";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // Show loading screen for 1.5s for the dramatic entrance effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-orange-50 via-amber-100 to-rose-100 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sun className="w-16 h-16 text-orange-500" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xl font-medium text-orange-800 tracking-widest uppercase"
            >
              Awakening...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      >
        <main className="min-h-screen relative selection:bg-orange-200 overflow-hidden">
          <Hero />
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 bg-white/20 backdrop-blur-3xl border-t border-white/40 shadow-[0_-10px_40px_rgba(255,160,122,0.1)] pb-24"
          >
            <EnergyCards />
            <FocusMode />
            <MotivationCarousel />
            <OfficeMood />
          </motion.div>
          
          <footer className="py-8 text-center text-slate-500 text-sm glass">
            <p>Breathe. Smile. Conquer your week.</p>
          </footer>
        </main>
      </motion.div>
    </>
  );
}
