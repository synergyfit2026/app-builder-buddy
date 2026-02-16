import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, Mail, Lock, ArrowRight, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast({ title: "Uspešna prijava!", description: "Dobrodošli nazad." });
        navigate("/dashboard");
      } else {
        if (password.length < 6) {
          toast({ title: "Greška", description: "Lozinka mora imati minimum 6 karaktera.", variant: "destructive" });
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Registracija uspešna!", description: "Možete se prijaviti." });
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast({
        title: "Greška",
        description: error.message === "Invalid login credentials"
          ? "Pogrešan email ili lozinka."
          : error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <Dumbbell className="w-7 h-7 text-primary" />
        <span className="font-display font-bold text-2xl text-foreground">SynergyFit</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8"
      >
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          {isLogin ? "Prijavi se" : "Kreiraj nalog"}
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          {isLogin ? "Nastavi ka svom planu treninga." : "Započni svoju fitness transformaciju."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email adresa"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="Lozinka"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Učitavanje..." : isLogin ? "Prijavi se" : "Registruj se"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            {isLogin ? (
              <>Nemaš nalog? <span className="text-primary font-medium">Registruj se</span></>
            ) : (
              <>Već imaš nalog? <span className="text-primary font-medium">Prijavi se</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
