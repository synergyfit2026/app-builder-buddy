import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Calendar, Target } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const weekData = [
  { day: "Pon", completed: true, calories: 350 },
  { day: "Uto", completed: true, calories: 300 },
  { day: "Sre", completed: false, calories: 0 },
  { day: "Čet", completed: true, calories: 320 },
  { day: "Pet", completed: false, calories: 0 },
  { day: "Sub", completed: true, calories: 280 },
  { day: "Ned", completed: false, calories: 0 },
];

const Progress = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sf_user");
    if (!stored) { navigate("/onboarding"); return; }
    setUserData(JSON.parse(stored));
  }, [navigate]);

  const totalCalories = weekData.reduce((a, b) => a + b.calories, 0);
  const completedDays = weekData.filter(d => d.completed).length;
  const maxCal = Math.max(...weekData.map(d => d.calories), 1);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <h1 className="font-display text-xl font-bold text-foreground">Tvoj napredak</h1>
          <p className="text-muted-foreground text-sm">Ova nedelja</p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Flame, label: "Ukupno kalorija", value: `${totalCalories}`, sub: "kcal ove nedelje", color: "text-accent" },
            { icon: Calendar, label: "Treninzi", value: `${completedDays}/7`, sub: "završeni dani", color: "text-primary" },
            { icon: TrendingUp, label: "Streak", value: "4", sub: "dana zaredom", color: "text-sf-green" },
            { icon: Target, label: "Cilj", value: "72%", sub: "ostvaren", color: "text-primary" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-6">Nedeljni pregled</h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  className={`w-full rounded-lg ${d.completed ? "bg-gradient-primary" : "bg-muted"}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${d.calories ? (d.calories / maxCal) * 100 : 8}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  style={{ minHeight: "8px" }}
                />
                <span className={`text-xs font-medium ${d.completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 border-primary/20"
        >
          <p className="text-2xl mb-2">💪</p>
          <h3 className="font-display font-semibold text-foreground mb-1">Odlično napreduješ!</h3>
          <p className="text-muted-foreground text-sm">
            Završio si {completedDays} treninga ove nedelje. Nastavi ovim tempom i bićeš korak bliže svom cilju!
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Progress;
