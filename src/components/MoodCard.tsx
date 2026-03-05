import { motion } from "framer-motion";

interface MoodCardProps {
  emoji: string;
  label: string;
  gradient: string;
  onClick?: () => void;
  selected?: boolean;
}

const MoodCard = ({ emoji, label, gradient, onClick, selected }: MoodCardProps) => (
  <motion.button
    whileHover={{ scale: 1.08, y: -4 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-3xl cursor-pointer transition-shadow duration-300 min-w-[100px] ${gradient} ${
      selected ? "ring-4 ring-primary shadow-xl" : "shadow-md hover:shadow-lg"
    }`}
  >
    <span className="text-3xl">{emoji}</span>
    <span className="text-sm font-semibold text-card-foreground">{label}</span>
  </motion.button>
);

export default MoodCard;
