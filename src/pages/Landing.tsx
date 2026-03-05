import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MoodCard from "@/components/MoodCard";
import { MessageCircle, BarChart3, Map, Users, CalendarPlus, Star, Menu, X } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

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

const features = [
  { icon: MessageCircle, title: "Real-time Chat", desc: "Instant messaging with your event group" },
  { icon: BarChart3, title: "Poll Decisions", desc: "Vote on plans together as a group" },
  { icon: Map, title: "Map Discovery", desc: "Find events happening near you" },
  { icon: Users, title: "Friend System", desc: "Connect with like-minded people" },
  { icon: CalendarPlus, title: "Event Creation", desc: "Host your own hangouts easily" },
  { icon: Star, title: "Mood Matching", desc: "Find people who share your vibe" },
];

const steps = [
  { num: "01", title: "Select Your Mood", desc: "Tell us how you're feeling right now" },
  { num: "02", title: "Discover Vibes", desc: "See nearby events that match your mood" },
  { num: "03", title: "Join or Create", desc: "Jump into events or host your own" },
  { num: "04", title: "Chat & Meet", desc: "Connect with your group and hang out" },
];

const testimonials = [
  { name: "Alex Chen", text: "VibeMatch helped me find a study group during finals week. 10/10!", avatar: "🧑‍💻", mood: "Study" },
  { name: "Maya Johnson", text: "Found the best food spots in my area through Food Hunt events!", avatar: "👩‍🍳", mood: "Food Hunt" },
  { name: "Jordan Lee", text: "Met my closest college friends through VibeMatch gaming nights.", avatar: "🎮", mood: "Gaming" },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-xl font-extrabold gradient-text">VibeMatch</Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#moods" className="hover:text-foreground transition-colors">Explore Vibes</a>
            <Link to="/create-event" className="hover:text-foreground transition-colors">Create Event</Link>
            <Link to="/dashboard"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/dashboard"><Button variant="hero" size="sm">Sign Up</Button></Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden border-t border-border px-4 pb-4 space-y-2">
            <a href="#features" className="block py-2 text-sm text-muted-foreground">Features</a>
            <a href="#moods" className="block py-2 text-sm text-muted-foreground">Explore Vibes</a>
            <Link to="/create-event" className="block py-2 text-sm text-muted-foreground">Create Event</Link>
            <Link to="/dashboard"><Button variant="hero" size="sm" className="w-full">Get Started</Button></Link>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Find Your <span className="gradient-text">Vibe.</span><br />
              Find Your <span className="gradient-text">People.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover activities, events, and people nearby based on your current mood. Your next great hangout is just a vibe away.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard"><Button variant="hero" size="lg" className="rounded-2xl text-base px-8">Join the Vibe</Button></Link>
              <Link to="/map"><Button variant="hero-outline" size="lg" className="rounded-2xl text-base px-8">Explore Nearby Events</Button></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <img src={heroImage} alt="People hanging out and socializing" className="rounded-3xl shadow-2xl w-full" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          How It <span className="gradient-text">Works</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-6 text-center hover-lift">
              <div className="text-4xl font-extrabold gradient-text mb-3">{s.num}</div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mood Categories */}
      <section id="moods" className="container mx-auto px-4 py-16">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Pick Your <span className="gradient-text">Mood</span>
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {moods.map((m, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <MoodCard {...m} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-16">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Feature <span className="gradient-text">Highlights</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                <f.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          What People <span className="gradient-text">Say</span>
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-primary">{t.mood} lover</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-extrabold gradient-text mb-3">VibeMatch</h3>
              <p className="text-sm text-muted-foreground">Find your vibe. Find your people. The mood-based hangout platform for social discovery.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Links</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="hover:text-foreground cursor-pointer transition-colors">About</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Contact</p>
                <p className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Connect</h4>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "Discord"].map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">© 2026 VibeMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
