import { useState } from "react";
import { motion } from "framer-motion";

interface PollOption {
  label: string;
  votes: number;
}

interface PollWidgetProps {
  question: string;
  options: PollOption[];
}

const PollWidget = ({ question, options: initialOptions }: PollWidgetProps) => {
  const [options, setOptions] = useState(initialOptions);
  const [voted, setVoted] = useState<number | null>(null);
  const total = options.reduce((s, o) => s + o.votes, 0);

  const vote = (i: number) => {
    if (voted !== null) return;
    setVoted(i);
    setOptions(prev => prev.map((o, idx) => idx === i ? { ...o, votes: o.votes + 1 } : o));
  };

  return (
    <div className="glass rounded-2xl p-4 max-w-sm">
      <p className="font-semibold text-foreground mb-3">📊 {question}</p>
      <div className="space-y-2">
        {options.map((o, i) => {
          const pct = total > 0 ? Math.round((o.votes / (total + (voted !== null ? 1 : 0))) * 100) : 0;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => vote(i)}
              className={`w-full text-left relative rounded-xl overflow-hidden p-3 text-sm font-medium transition-all ${
                voted === i ? "ring-2 ring-primary" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {voted !== null && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  className="absolute inset-0 bg-primary/15 rounded-xl"
                />
              )}
              <span className="relative z-10 flex justify-between">
                <span>{o.label}</span>
                {voted !== null && <span className="text-muted-foreground">{pct}%</span>}
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{total + (voted !== null ? 1 : 0)} votes</p>
    </div>
  );
};

export default PollWidget;
