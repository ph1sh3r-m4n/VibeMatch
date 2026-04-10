import { MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EventCardProps {
  id?: number;
  title: string;
  mood: string;
  moodEmoji: string;
  location: string;
  time: string;
  host: string;
  participants?: number;
  maxParticipants?: number;
}

const EventCard = ({ id, title, mood, moodEmoji, location, time, host, participants = 0, maxParticipants }: EventCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="glass rounded-3xl p-5 hover-lift"
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-bold text-lg text-foreground">{title}</h3>
      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1">
        {moodEmoji} {mood}
      </span>
    </div>
    <div className="space-y-2 text-sm text-muted-foreground mb-4">
      <div className="flex items-center gap-2"><MapPin size={14} /> {location}</div>
      <div className="flex items-center gap-2"><Clock size={14} /> {time}</div>
      <div className="flex items-center gap-2"><User size={14} /> Hosted by {host}</div>
    </div>
    {maxParticipants && (
      <div className="mb-3">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${(participants / maxParticipants) * 100}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{participants}/{maxParticipants} joined</p>
      </div>
    )}
    <Link to={`/chat/${id || ''}`} className="w-full block">
      <Button variant="hero" size="sm" className="w-full rounded-2xl">Join Event</Button>
    </Link>
  </motion.div>
);

export default EventCard;
