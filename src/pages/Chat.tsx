import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/ChatBubble";
import PollWidget from "@/components/PollWidget";
import DashboardLayout from "@/layouts/DashboardLayout";

const messages = [
  { username: "Alex", avatar: "🧑‍💻", message: "Hey everyone! Where should we go tonight?", time: "7:30 PM", isOwn: false },
  { username: "Maya", avatar: "👩‍🎤", message: "I'm down for anything chill!", time: "7:31 PM", isOwn: false, reactions: ["🔥", "👍"] },
  { username: "You", avatar: "😎", message: "How about we vote on it?", time: "7:32 PM", isOwn: true },
  { username: "Jordan", avatar: "🧑‍🎓", message: "Great idea! Let's do a poll", time: "7:33 PM", isOwn: false },
];

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
        {/* Chat header */}
        <div className="glass rounded-t-3xl p-4 flex items-center gap-3 border-b border-border/50">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg">🎉</div>
          <div>
            <h3 className="font-bold text-foreground">Weekend Party Bash</h3>
            <p className="text-xs text-muted-foreground">4 members online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 glass border-x border-border/50">
          {messages.map((m, i) => (
            <ChatBubble key={i} {...m} />
          ))}
          {/* Poll */}
          <div className="flex gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-lg shrink-0">😎</div>
            <PollWidget
              question="Where should we go?"
              options={[
                { label: "☕ Cafe A", votes: 5 },
                { label: "🍕 Cafe B", votes: 3 },
                { label: "🛍️ Mall", votes: 7 },
              ]}
            />
          </div>
        </div>

        {/* Input */}
        <div className="glass rounded-b-3xl p-4 flex gap-2 border-t border-border/50">
          <Button variant="ghost" size="icon" className="shrink-0 rounded-xl"><Smile size={20} /></Button>
          <Input
            placeholder="Type a message..."
            className="rounded-2xl"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setNewMessage("")}
          />
          <Button variant="hero" size="icon" className="shrink-0 rounded-xl"><Send size={18} /></Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
