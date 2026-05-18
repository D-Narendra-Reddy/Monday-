"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const quotes = [
  "You are entirely up to you. Make today count.",
  "Your attitude determines your direction.",
  "Small steps every day lead to big results.",
  "Don't stop until you're proud.",
  "The secret of getting ahead is getting started.",
];

export default function MotivationCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-10 md:p-12 text-center relative overflow-hidden">
        <Quote className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 text-orange-300/30 rotate-180" />
        <Quote className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 text-orange-300/30" />
        
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-700 leading-snug px-4 sm:px-8"
            >
              "{quotes[index]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-orange-500 w-6" : "bg-orange-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
