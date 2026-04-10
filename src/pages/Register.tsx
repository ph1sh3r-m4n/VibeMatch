import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.token, data.username, data.id);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-xl mx-auto mb-4">🌟</div>
          <h2 className="text-2xl font-extrabold text-foreground">Create Account</h2>
          <p className="text-muted-foreground mt-2">Join VibeMatch today</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="hero" className="w-full rounded-2xl">Register</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
