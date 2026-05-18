"use client";

import { motion } from "framer-motion";
import { Coffee, Music, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function OfficeMood() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We create a dummy audio element. In a real app, this would be a real lofi stream URL.
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const stickyNotes = [
    { text: "You're capable of more than you think.", color: "bg-yellow-200", rotate: "-rotate-3" },
    { text: "One step at a time ✨", color: "bg-pink-200", rotate: "rotate-2" },
    { text: "Breathe. You got this.", color: "bg-blue-200", rotate: "-rotate-1" },
  ];

  return (
    <section className="py-16 md:py-20 px-4 relative max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-12">
        
        {/* Coffee Cup Animation */}
        <div className="relative flex-1 flex justify-center items-center">
          <div className="relative">
            {/* Steam */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex space-x-2">
              <div className="w-1 h-12 bg-white/40 blur-sm rounded-full animate-steam" style={{ animationDelay: "0s" }} />
              <div className="w-1.5 h-16 bg-white/40 blur-sm rounded-full animate-steam" style={{ animationDelay: "0.5s" }} />
              <div className="w-1 h-10 bg-white/40 blur-sm rounded-full animate-steam" style={{ animationDelay: "1s" }} />
            </div>
            
            <div className="glass p-6 rounded-3xl flex items-center justify-center flex-col gap-4">
              <Coffee className="w-16 h-16 text-amber-700" />
              <span className="text-amber-800 font-medium">Virtual Coffee</span>
            </div>
          </div>
        </div>

        {/* Sticky Notes */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {stickyNotes.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className={`${note.color} ${note.rotate} p-6 rounded-sm shadow-md cursor-pointer transition-transform duration-300`}
              style={{
                boxShadow: "2px 4px 10px rgba(0,0,0,0.1)",
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)"
              }}
            >
              <div className="absolute bottom-0 right-0 w-[15px] h-[15px] bg-black/10 transition-all" />
              <p className="text-slate-800 font-medium text-lg font-handwriting">{note.text}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating Audio Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 z-50 glass p-4 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-orange-600 transition-colors"
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        <span className="sr-only">Toggle Lofi Music</span>
      </motion.button>
    </section>
  );
}
