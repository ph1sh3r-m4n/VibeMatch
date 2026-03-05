import { motion } from "framer-motion";
import { Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import DashboardLayout from "@/layouts/DashboardLayout";

const upcomingEvents = [
  { title: "Sunset Yoga", mood: "Chill", moodEmoji: "😌", location: "Central Park", time: "Tomorrow, 6:00 PM", host: "Priya", participants: 12, maxParticipants: 20 },
  { title: "Game Night", mood: "Gaming", moodEmoji: "🎮", location: "Gaming Lounge", time: "Fri, 7:00 PM", host: "Chris", participants: 8, maxParticipants: 12 },
];

const friends = [
  { name: "Alex Chen", mood: "Chill", avatar: "🧑‍💻" },
  { name: "Maya Johnson", mood: "Party", avatar: "👩‍🎤" },
  { name: "Jordan Lee", mood: "Study", avatar: "🧑‍🎓" },
  { name: "Sam Rivera", mood: "Food Hunt", avatar: "👨‍🍳" },
  { name: "Priya Patel", mood: "Workout", avatar: "🧘" },
  { name: "Chris Kim", mood: "Gaming", avatar: "🎮" },
];

const pastActivities = [
  { title: "Board Game Night", date: "Feb 28", mood: "Gaming" },
  { title: "Ramen Tour", date: "Feb 25", mood: "Food Hunt" },
  { title: "Morning Hike", date: "Feb 22", mood: "Outdoor" },
];

const Profile = () => (
  <DashboardLayout>
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-5xl shadow-lg">😎</div>
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl font-extrabold text-foreground">Jamie Wilson</h2>
          <p className="text-muted-foreground mb-2">@jamiewilson · Campus Explorer</p>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">😌 Feeling Chill</span>
          <p className="text-sm text-muted-foreground mt-2">Always looking for the next great hangout. Coffee lover, sunset chaser, and part-time DJ. 🎧</p>
        </div>
        <Button variant="hero-outline" className="rounded-2xl">Edit Profile</Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Calendar, label: "Events Joined", value: "24" },
          { icon: Users, label: "Friends", value: "156" },
          { icon: Clock, label: "Hours Vibing", value: "89" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-4 text-center">
            <s.icon className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Events */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-foreground">Upcoming Events</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {upcomingEvents.map((e, i) => <EventCard key={i} {...e} />)}
        </div>
      </section>

      {/* Friends */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-foreground">Friends</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {friends.map((f, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="glass rounded-2xl p-4 flex items-center gap-3 cursor-pointer">
              <span className="text-2xl">{f.avatar}</span>
              <div>
                <p className="font-semibold text-sm text-foreground">{f.name}</p>
                <p className="text-xs text-primary">{f.mood}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Activities */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-foreground">Past Activities</h3>
        <div className="space-y-2">
          {pastActivities.map((a, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{a.mood}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </DashboardLayout>
);

export default Profile;
