import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, LogOut, Mail, Check, Crown } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";

const goals = [
  { key: "weight_loss", label: "Mršavljenje", emoji: "🔥" },
  { key: "muscle", label: "Mišićna masa", emoji: "💪" },
  { key: "health", label: "Zdraviji život", emoji: "🌿" },
  { key: "flexibility", label: "Fleksibilnost", emoji: "🧘" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [editingGoal, setEditingGoal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sf_user");
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  const activityLabels: Record<string, string> = {
    beginner: "Početnik",
    moderate: "Umeren",
    active: "Aktivan",
    athlete: "Sportista",
  };

  const handleGoalChange = (newGoal: string) => {
    const updated = { ...userData, goal: newGoal };
    setUserData(updated);
    localStorage.setItem("sf_user", JSON.stringify(updated));
    setEditingGoal(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <h1 className="font-display text-xl font-bold text-foreground">Moj profil</h1>
          <p className="text-muted-foreground text-sm">Podešavanja naloga</p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-6 space-y-6">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                {user?.email?.split("@")[0] || "Korisnik"}
              </h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {user?.email || "—"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Goal Changer */}
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Tvoj cilj</h3>
              {!editingGoal && (
                <button
                  onClick={() => setEditingGoal(true)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Promeni
                </button>
              )}
            </div>

            {editingGoal ? (
              <div className="grid grid-cols-2 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => handleGoalChange(g.key)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      userData.goal === g.key
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{g.emoji}</span>
                    <span className="font-display font-medium text-sm text-foreground">{g.label}</span>
                    {userData.goal === g.key && (
                      <Check className="w-4 h-4 text-primary mt-1" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {goals.find((g) => g.key === userData.goal)?.emoji || "🎯"}
                </span>
                <span className="font-display font-medium text-foreground">
                  {goals.find((g) => g.key === userData.goal)?.label || "—"}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-4"
          >
            <h3 className="font-display font-semibold text-foreground mb-2">Tvoji podaci</h3>
            {[
              { label: "Godine", value: userData.age ? `${userData.age} god` : "—" },
              { label: "Težina", value: userData.weight ? `${userData.weight} kg` : "—" },
              { label: "Visina", value: userData.height ? `${userData.height} cm` : "—" },
              { label: "Aktivnost", value: activityLabels[userData.activityLevel] || "—" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground text-sm">{item.label}</span>
                <span className="font-display font-medium text-foreground text-sm">{item.value}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Upgrade to Premium */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-8 border-primary/30 glow-primary text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Crown className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Nadogradi na Premium</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Otključaj naprednu AI personalizaciju, prepoznavanje obroka kamerom, detaljne statistike i više.
          </p>
          <div className="mb-6">
            <span className="font-display text-4xl font-bold text-foreground">$9.99</span>
            <span className="text-muted-foreground text-sm">/mesečno</span>
          </div>
          <button className="bg-gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
            Započni Premium
          </button>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={handleLogout}
          className="glass-card p-4 w-full flex items-center justify-center gap-3 hover:border-destructive/50 transition-colors"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="font-display font-semibold text-destructive">Odjavi se</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
