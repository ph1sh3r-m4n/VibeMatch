import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MapEventCardProps {
  id?: string;
  title: string;
  host: string;
  participants: number;
  mood: string;
  moodEmoji: string;
}

const MapEventCard = ({ id, title, host, participants, mood, moodEmoji }: MapEventCardProps) => (
  <div className="glass rounded-2xl p-4 space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-2xl">{moodEmoji}</span>
      <div>
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">Hosted by {host}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="flex items-center gap-1"><Users size={14} /> {participants} joined</span>
      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{mood}</span>
    </div>
    <Link to={`/chat/${id || ''}`} className="w-full block" onClick={(e) => e.stopPropagation()}>
      <Button variant="hero" size="sm" className="w-full rounded-xl">Join Event</Button>
    </Link>
  </div>
);

export default MapEventCard;
