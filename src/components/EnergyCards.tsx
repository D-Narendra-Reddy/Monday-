"use client";

import { motion } from "framer-motion";
import { Zap, Target, Heart } from "lucide-react";

const cards = [
  {
    title: "Energy Boost",
    content: "Your potential is limitless. Drink some water, stretch, and let's go.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    color: "from-yellow-100 to-orange-100",
  },
  {
    title: "Focus Shift",
    content: "Close unnecessary tabs. Pick one task. Give it your full attention.",
    icon: <Target className="w-6 h-6 text-rose-500" />,
    color: "from-rose-100 to-pink-100",
  },
  {
    title: "Self Care",
    content: "You are doing great. Don't forget to take short breaks today.",
    icon: <Heart className="w-6 h-6 text-purple-500" />,
    color: "from-purple-100 to-fuchsia-100",
  },
];

export default function EnergyCards() {
  return (
    <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass glass-hover p-8 rounded-3xl group cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
              {card.icon}
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">{card.title}</h3>
            <p className="text-slate-600 leading-relaxed font-light">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
