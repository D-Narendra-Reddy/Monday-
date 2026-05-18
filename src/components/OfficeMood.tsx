"use client";

import { motion } from "framer-motion";
import { Droplet, Music, Volume2, VolumeX } from "lucide-react";
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
        
        {/* Water Animation */}
        <div className="relative flex-1 flex flex-col justify-center items-center">
          <div className="relative">
            {/* Floating Droplets */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex space-x-3">
              <motion.div 
                animate={{ y: [0, -20, -40], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0 }}
                className="w-2 h-2 bg-blue-300 rounded-full"
              />
              <motion.div 
                animate={{ y: [0, -30, -50], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                className="w-3 h-3 bg-blue-200 rounded-full"
              />
              <motion.div 
                animate={{ y: [0, -20, -40], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="w-2 h-2 bg-blue-300 rounded-full"
              />
            </div>
            
            <div className="glass p-6 rounded-3xl flex items-center justify-center flex-col gap-4 border-blue-200/50 shadow-[0_8px_32px_rgba(59,130,246,0.15)]">
              <Droplet className="w-16 h-16 text-blue-500" />
              <span className="text-blue-600 font-medium">Fresh Water</span>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-6 text-slate-600 text-center text-sm sm:text-base font-light italic max-w-xs"
          >
            Since you don't like coffee or tea, here's some fresh water to keep you hydrated and refreshed! 💧
          </motion.p>
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
