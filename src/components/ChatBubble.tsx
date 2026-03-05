interface ChatBubbleProps {
  message: string;
  username: string;
  avatar: string;
  time: string;
  isOwn?: boolean;
  reactions?: string[];
}

const ChatBubble = ({ message, username, avatar, time, isOwn, reactions }: ChatBubbleProps) => (
  <div className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : ""}`}>
    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-lg shrink-0">
      {avatar}
    </div>
    <div className={`max-w-[70%] ${isOwn ? "items-end" : ""}`}>
      <p className={`text-xs font-medium mb-1 ${isOwn ? "text-right" : ""} text-muted-foreground`}>{username}</p>
      <div className={`px-4 py-2.5 rounded-2xl text-sm ${
        isOwn ? "gradient-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"
      }`}>
        {message}
      </div>
      {reactions && reactions.length > 0 && (
        <div className="flex gap-1 mt-1">
          {reactions.map((r, i) => (
            <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{r}</span>
          ))}
        </div>
      )}
      <p className={`text-[10px] text-muted-foreground mt-1 ${isOwn ? "text-right" : ""}`}>{time}</p>
    </div>
  </div>
);

export default ChatBubble;
