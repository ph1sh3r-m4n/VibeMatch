import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import MapEventCard from "@/components/MapEventCard";
import MoodCard from "@/components/MoodCard";
import DashboardLayout from "@/layouts/DashboardLayout";

const moods = [
  { emoji: "😌", label: "Chill", gradient: "bg-gradient-to-br from-blue-100 to-indigo-100" },
  { emoji: "🎉", label: "Party", gradient: "bg-gradient-to-br from-pink-100 to-rose-100" },
  { emoji: "📚", label: "Study", gradient: "bg-gradient-to-br from-amber-100 to-yellow-100" },
  { emoji: "🍔", label: "Food Hunt", gradient: "bg-gradient-to-br from-orange-100 to-red-100" },
];

const mapEvents = [
  { title: "Sunset Yoga", host: "Priya", participants: 12, mood: "Chill", moodEmoji: "😌", x: 25, y: 35 },
  { title: "Dance Party", host: "Maya", participants: 28, mood: "Party", moodEmoji: "🎉", x: 55, y: 20 },
  { title: "Book Club", host: "Jordan", participants: 6, mood: "Study", moodEmoji: "📚", x: 70, y: 60 },
  { title: "Taco Crawl", host: "Sam", participants: 15, mood: "Food Hunt", moodEmoji: "🍔", x: 40, y: 70 },
  { title: "Morning Run", host: "Alex", participants: 8, mood: "Chill", moodEmoji: "😌", x: 15, y: 55 },
  { title: "Game Night", host: "Chris", participants: 10, mood: "Party", moodEmoji: "🎉", x: 80, y: 40 },
];

const MapDiscovery = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof mapEvents[0] | null>(null);
  const filtered = selectedMood ? mapEvents.filter(e => e.mood === selectedMood) : mapEvents;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Mood filter */}
        <div className="flex flex-wrap gap-2">
          {moods.map(m => (
            <MoodCard key={m.label} {...m} selected={selectedMood === m.label} onClick={() => setSelectedMood(selectedMood === m.label ? null : m.label)} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Map placeholder */}
          <div className="lg:col-span-2 glass rounded-3xl relative overflow-hidden" style={{ minHeight: 400 }}>
            {/* Gradient map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(hsl(239 84% 67% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(239 84% 67% / 0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>
            {/* Pins */}
            {filtered.map((e, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                onClick={() => setSelectedEvent(e)}
                className={`absolute flex flex-col items-center cursor-pointer group ${selectedEvent?.title === e.title ? "z-20" : "z-10"}`}
                style={{ left: `${e.x}%`, top: `${e.y}%`, transform: "translate(-50%, -100%)" }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${selectedEvent?.title === e.title ? "gradient-primary animate-pulse-glow" : "bg-card"}`}>
                  <span className="text-lg">{e.moodEmoji}</span>
                </div>
                <div className="w-2 h-2 gradient-primary rounded-full -mt-1" />
              </motion.button>
            ))}
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {selectedEvent ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <MapEventCard {...selectedEvent} />
              </motion.div>
            ) : (
              <div className="glass rounded-2xl p-6 text-center">
                <MapPin size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">Click a pin on the map to see event details</p>
              </div>
            )}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground">Nearby Events</h3>
              {filtered.slice(0, 3).map((e, i) => (
                <button key={i} onClick={() => setSelectedEvent(e)} className="w-full text-left">
                  <MapEventCard {...e} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapDiscovery;
