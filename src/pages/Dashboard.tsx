import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import MoodCard from "@/components/MoodCard";
import EventCard from "@/components/EventCard";
import DashboardLayout from "@/layouts/DashboardLayout";
import { fetchEvents } from "@/lib/api";

const moods = [
  { emoji: "😌", label: "Chill", gradient: "bg-gradient-to-br from-blue-100 to-indigo-100" },
  { emoji: "🎉", label: "Party", gradient: "bg-gradient-to-br from-pink-100 to-rose-100" },
  { emoji: "📚", label: "Study", gradient: "bg-gradient-to-br from-amber-100 to-yellow-100" },
  { emoji: "🍔", label: "Food Hunt", gradient: "bg-gradient-to-br from-orange-100 to-red-100" },
  { emoji: "🏋️", label: "Workout", gradient: "bg-gradient-to-br from-green-100 to-emerald-100" },
  { emoji: "🎮", label: "Gaming", gradient: "bg-gradient-to-br from-violet-100 to-purple-100" },
  { emoji: "🎬", label: "Movie Night", gradient: "bg-gradient-to-br from-cyan-100 to-teal-100" },
  { emoji: "🌿", label: "Outdoor", gradient: "bg-gradient-to-br from-lime-100 to-green-100" },
];


const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', selectedMood],
    queryFn: () => fetchEvents(selectedMood)
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Mood Selector */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-foreground">How are you feeling?</h2>
          <div className="flex flex-wrap gap-3">
            {moods.map((m) => (
              <MoodCard key={m.label} {...m} selected={selectedMood === m.label} onClick={() => setSelectedMood(selectedMood === m.label ? null : m.label)} />
            ))}
          </div>
        </section>

        {/* Events */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-foreground">
            {selectedMood ? `${selectedMood} Events` : "Suggested Events"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-12 col-span-full">Loading events...</p>
            ) : events.map((e: any, i: number) => (
              <motion.div key={e.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <EventCard {...e} />
              </motion.div>
            ))}
          </div>
          {!isLoading && events.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No events for this mood yet. Create one!</p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
