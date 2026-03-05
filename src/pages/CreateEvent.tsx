import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import EventCard from "@/components/EventCard";
import DashboardLayout from "@/layouts/DashboardLayout";

const moodOptions = [
  { value: "Chill", emoji: "😌" }, { value: "Party", emoji: "🎉" }, { value: "Study", emoji: "📚" },
  { value: "Food Hunt", emoji: "🍔" }, { value: "Workout", emoji: "🏋️" }, { value: "Gaming", emoji: "🎮" },
  { value: "Movie Night", emoji: "🎬" }, { value: "Outdoor", emoji: "🌿" },
];

const CreateEvent = () => {
  const [form, setForm] = useState({ title: "", mood: "", location: "", date: "", maxParticipants: "20", description: "", isPublic: true });
  const selectedMood = moodOptions.find(m => m.value === form.mood);

  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
        <div className="glass rounded-3xl p-6 space-y-5">
          <h2 className="text-2xl font-extrabold text-foreground">Create Event</h2>
          <div className="space-y-4">
            <div>
              <Label>Event Title</Label>
              <Input placeholder="Give your event a name" className="rounded-xl mt-1" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div>
              <Label>Mood Category</Label>
              <Select value={form.mood} onValueChange={v => setForm({...form, mood: v})}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue placeholder="Select a mood" /></SelectTrigger>
                <SelectContent>
                  {moodOptions.map(m => <SelectItem key={m.value} value={m.value}>{m.emoji} {m.value}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Input placeholder="Where's the hangout?" className="rounded-xl mt-1" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date & Time</Label>
                <Input type="datetime-local" className="rounded-xl mt-1" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div>
                <Label>Max Participants</Label>
                <Input type="number" className="rounded-xl mt-1" value={form.maxParticipants} onChange={e => setForm({...form, maxParticipants: e.target.value})} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isPublic} onCheckedChange={v => setForm({...form, isPublic: v})} />
              <Label>{form.isPublic ? "Public Event" : "Private Event"}</Label>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Tell people about your event..." className="rounded-xl mt-1 min-h-[100px]" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <Button variant="hero" size="lg" className="w-full rounded-2xl">Create Event 🎉</Button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-foreground">Preview</h3>
          <EventCard
            title={form.title || "Event Title"}
            mood={form.mood || "Mood"}
            moodEmoji={selectedMood?.emoji || "✨"}
            location={form.location || "Location"}
            time={form.date ? new Date(form.date).toLocaleString() : "Date & Time"}
            host="You"
            participants={0}
            maxParticipants={parseInt(form.maxParticipants) || 20}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateEvent;
