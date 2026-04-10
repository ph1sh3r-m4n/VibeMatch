import { useState, useEffect, useRef } from "react";
import { Send, Smile } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/ChatBubble";
import PollWidget from "@/components/PollWidget";
import DashboardLayout from "@/layouts/DashboardLayout";
import { fetchEventById, fetchMessages } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const Chat = () => {
  const { eventId } = useParams();
  const { username, userId } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEventById(eventId!),
    enabled: !!eventId
  });

  const { data: initialMessages = [] } = useQuery({
    queryKey: ['messages', eventId],
    queryFn: () => fetchMessages(eventId!),
    enabled: !!eventId
  });

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (!eventId) return;
    
    socketRef.current = io('http://localhost:3000');
    
    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join_event', eventId);
    });

    socketRef.current.on('receive_message', (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [eventId]);

  const handleSend = () => {
    if (!newMessage.trim() || !eventId) return;
    socketRef.current?.emit('send_message', {
      eventId,
      username: username || "Guest",
      avatar: "🧑‍💻",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setNewMessage("");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
        {/* Chat header */}
        <div className="glass rounded-t-3xl p-4 flex items-center gap-3 border-b border-border/50">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg">{event?.moodEmoji || "🎉"}</div>
          <div>
            <h3 className="font-bold text-foreground">{eventLoading ? "Loading..." : event?.title}</h3>
            <p className="text-xs text-muted-foreground">{event?.participants} members</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 glass border-x border-border/50 flex flex-col">
          {messages.map((m, i) => (
             <ChatBubble key={m.id || i} {...m} isOwn={m.username === username} />
          ))}
          {messages.length === 0 && <p className="text-center text-muted-foreground py-10">No messages yet. Say hi! 👋</p>}
        </div>

        {/* Input */}
        <div className="glass rounded-b-3xl p-4 flex gap-2 border-t border-border/50">
          <Button variant="ghost" size="icon" className="shrink-0 rounded-xl"><Smile size={20} /></Button>
          <Input
            placeholder="Type a message..."
            className="rounded-2xl"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} variant="hero" size="icon" className="shrink-0 rounded-xl"><Send size={18} /></Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Chat;
