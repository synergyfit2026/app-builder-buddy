import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Activity, BarChart3, User, LogOut, Dumbbell, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sf_user");
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  const goalLabels: Record<string, string> = {
    weight_loss: "Mršavljenje",
    muscle: "Mišićna masa",
    health: "Zdraviji život",
    flexibility: "Fleksibilnost",
  };

  const activityLabels: Record<string, string> = {
    beginner: "Početnik",
    moderate: "Umeren",
    active: "Aktivan",
    athlete: "Sportista",
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
              { label: "Cilj", value: goalLabels[userData.goal] || "—" },
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

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleLogout}
          className="glass-card p-4 w-full flex items-center justify-center gap-3 hover:border-destructive/50 transition-colors"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="font-display font-semibold text-destructive">Odjavi se</span>
        </motion.button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-around py-3">
            {[
              { icon: Home, label: "Početna", to: "/" },
              { icon: Activity, label: "Plan", to: "/dashboard" },
              { icon: BarChart3, label: "Napredak", to: "/progress" },
              { icon: User, label: "Profil", to: "/profile", active: true },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex flex-col items-center gap-1 ${
                  item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
