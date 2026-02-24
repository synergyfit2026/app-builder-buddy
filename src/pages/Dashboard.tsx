import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dumbbell, Flame, Droplets, TrendingUp, Check, Clock,
  ChevronRight, Calendar, Activity, Home, BarChart3, User, LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  duration?: string;
  completed: boolean;
}

interface DayPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
  calories: number;
}

const generatePlan = (goal: string | null): DayPlan[] => {
  const plans: Record<string, DayPlan[]> = {
    weight_loss: [
      { day: "Ponedeljak", focus: "Kardio & Core", calories: 350, exercises: [
        { name: "Trčanje na mestu", sets: 3, reps: 60, completed: false },
        { name: "Mountain Climbers", sets: 3, reps: 20, completed: false },
        { name: "Burpees", sets: 3, reps: 12, completed: false },
        { name: "Plank", sets: 3, reps: 45, completed: false },
        { name: "Bicycle Crunches", sets: 3, reps: 20, completed: false },
      ]},
      { day: "Utorak", focus: "Gornji deo tela", calories: 300, exercises: [
        { name: "Sklekovi", sets: 3, reps: 15, completed: false },
        { name: "Triceps Dips", sets: 3, reps: 12, completed: false },
        { name: "Shoulder Taps", sets: 3, reps: 20, completed: false },
        { name: "Pike Push-ups", sets: 3, reps: 10, completed: false },
      ]},
      { day: "Sreda", focus: "HIIT", calories: 400, exercises: [
        { name: "Jump Squats", sets: 4, reps: 15, completed: false },
        { name: "High Knees", sets: 4, reps: 30, completed: false },
        { name: "Box Jumps", sets: 3, reps: 12, completed: false },
        { name: "Sprint na mestu", sets: 4, reps: 30, completed: false },
      ]},
      { day: "Četvrtak", focus: "Donji deo tela", calories: 320, exercises: [
        { name: "Čučnjevi", sets: 4, reps: 20, completed: false },
        { name: "Iskoraci", sets: 3, reps: 15, completed: false },
        { name: "Glute Bridge", sets: 3, reps: 20, completed: false },
        { name: "Calf Raises", sets: 3, reps: 25, completed: false },
      ]},
    ],
    muscle: [
      { day: "Ponedeljak", focus: "Grudi & Triceps", calories: 280, exercises: [
        { name: "Bench Press", sets: 4, reps: 10, completed: false },
        { name: "Incline Dumbbell Press", sets: 3, reps: 12, completed: false },
        { name: "Cable Flyes", sets: 3, reps: 15, completed: false },
        { name: "Triceps Pushdown", sets: 3, reps: 12, completed: false },
      ]},
      { day: "Utorak", focus: "Leđa & Biceps", calories: 260, exercises: [
        { name: "Deadlift", sets: 4, reps: 8, completed: false },
        { name: "Lat Pulldown", sets: 3, reps: 12, completed: false },
        { name: "Barbell Row", sets: 3, reps: 10, completed: false },
        { name: "Bicep Curls", sets: 3, reps: 15, completed: false },
      ]},
      { day: "Sreda", focus: "Noge", calories: 350, exercises: [
        { name: "Squat", sets: 4, reps: 10, completed: false },
        { name: "Leg Press", sets: 3, reps: 12, completed: false },
        { name: "Romanian Deadlift", sets: 3, reps: 10, completed: false },
        { name: "Leg Curl", sets: 3, reps: 15, completed: false },
      ]},
      { day: "Četvrtak", focus: "Ramena & Core", calories: 240, exercises: [
        { name: "Overhead Press", sets: 4, reps: 10, completed: false },
        { name: "Lateral Raise", sets: 3, reps: 15, completed: false },
        { name: "Face Pulls", sets: 3, reps: 15, completed: false },
        { name: "Ab Rollout", sets: 3, reps: 12, completed: false },
      ]},
    ],
    health: [
      { day: "Ponedeljak", focus: "Šetnja & Mobilnost", calories: 200, exercises: [
        { name: "Brza šetnja", sets: 1, reps: 30, completed: false },
        { name: "Yoga Flow", sets: 1, reps: 15, completed: false },
        { name: "Deep Stretching", sets: 1, reps: 15, completed: false },
      ]},
      { day: "Utorak", focus: "Trening snage", calories: 250, exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: 15, completed: false },
        { name: "Push-ups", sets: 3, reps: 10, completed: false },
        { name: "Plank", sets: 3, reps: 30, completed: false },
        { name: "Glute Bridge", sets: 3, reps: 15, completed: false },
      ]},
      { day: "Sreda", focus: "Kardio", calories: 220, exercises: [
        { name: "Cycling ili Plivanje", sets: 1, reps: 30, completed: false },
        { name: "Cool-down Stretching", sets: 1, reps: 10, completed: false },
      ]},
      { day: "Četvrtak", focus: "Balans & Fleksibilnost", calories: 180, exercises: [
        { name: "Pilates rutina", sets: 1, reps: 20, completed: false },
        { name: "Single-leg Balance", sets: 3, reps: 30, completed: false },
        { name: "Foam Rolling", sets: 1, reps: 15, completed: false },
      ]},
    ],
    flexibility: [
      { day: "Ponedeljak", focus: "Yoga", calories: 150, exercises: [
        { name: "Sun Salutation", sets: 5, reps: 1, completed: false },
        { name: "Warrior Poses", sets: 1, reps: 10, completed: false },
        { name: "Hip Opener Flow", sets: 1, reps: 10, completed: false },
      ]},
      { day: "Utorak", focus: "Dinamičko istezanje", calories: 130, exercises: [
        { name: "Leg Swings", sets: 3, reps: 15, completed: false },
        { name: "Arm Circles", sets: 3, reps: 20, completed: false },
        { name: "Cat-Cow Stretch", sets: 3, reps: 10, completed: false },
      ]},
      { day: "Sreda", focus: "Pilates", calories: 170, exercises: [
        { name: "Roll Up", sets: 3, reps: 10, completed: false },
        { name: "Swimming", sets: 3, reps: 15, completed: false },
        { name: "Spine Twist", sets: 3, reps: 10, completed: false },
      ]},
      { day: "Četvrtak", focus: "Deep Stretch", calories: 120, exercises: [
        { name: "Pigeon Pose", sets: 2, reps: 60, completed: false },
        { name: "Forward Fold", sets: 3, reps: 45, completed: false },
        { name: "Spinal Twist", sets: 2, reps: 60, completed: false },
      ]},
    ],
  };
  return plans[goal || "health"] || plans.health;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [selectedDay, setSelectedDay] = useState(0);
  const [plan, setPlan] = useState<DayPlan[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sf_user");
    if (!stored) {
      navigate("/onboarding");
      return;
    }
    const parsed = JSON.parse(stored);
    setUserData(parsed);
    setPlan(generatePlan(parsed.goal));
  }, [navigate]);

  const toggleExercise = (exerciseIndex: number) => {
    setPlan(prev => {
      const newPlan = [...prev];
      const day = { ...newPlan[selectedDay] };
      day.exercises = [...day.exercises];
      day.exercises[exerciseIndex] = {
        ...day.exercises[exerciseIndex],
        completed: !day.exercises[exerciseIndex].completed,
      };
      newPlan[selectedDay] = day;
      return newPlan;
    });
  };

  if (!plan.length) return null;

  const currentDay = plan[selectedDay];
  const completedCount = currentDay.exercises.filter(e => e.completed).length;
  const progress = (completedCount / currentDay.exercises.length) * 100;

  const goalLabels: Record<string, string> = {
    weight_loss: "Mršavljenje",
    muscle: "Mišićna masa",
    health: "Zdraviji život",
    flexibility: "Fleksibilnost",
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Tvoj plan</h1>
              <p className="text-muted-foreground text-sm">Cilj: {goalLabels[userData?.goal] || "Zdravlje"}</p>
            </div>
              <div className="flex items-center gap-3">
              <div className="glass-card px-3 py-1.5 flex items-center gap-2">
                <Flame className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{currentDay.calories} kcal</span>
              </div>
              <button
                onClick={() => signOut().then(() => navigate("/"))}
                className="glass-card px-3 py-1.5 flex items-center gap-2 hover:border-destructive/50 transition-colors"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Odjavi se</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-6">
        {/* Day selector */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
          {plan.map((day, i) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(i)}
              className={`glass-card px-4 py-3 flex-shrink-0 transition-all ${
                selectedDay === i ? "border-primary/50 glow-primary" : ""
              }`}
            >
              <p className={`font-display text-sm font-semibold ${selectedDay === i ? "text-primary" : "text-foreground"}`}>
                {day.day}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">{day.focus}</p>
            </button>
          ))}
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-foreground">Napredak danas</h3>
            <span className="text-primary font-display font-bold">{completedCount}/{currentDay.exercises.length}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Exercises */}
        <div className="space-y-3">
          {currentDay.exercises.map((exercise, i) => (
            <motion.button
              key={exercise.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleExercise(i)}
              className={`glass-card p-4 w-full text-left flex items-center gap-4 transition-all ${
                exercise.completed ? "border-primary/30 opacity-70" : "hover:border-border"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                exercise.completed ? "bg-primary" : "bg-muted"
              }`}>
                {exercise.completed ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Dumbbell className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-display font-medium text-sm ${exercise.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {exercise.name}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {exercise.sets} serije × {exercise.reps} {exercise.reps > 30 ? "sek" : "pon."}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </motion.button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          {[
            { icon: Flame, label: "Kalorije", value: `${currentDay.calories}`, color: "text-accent" },
            { icon: Clock, label: "Trajanje", value: "~45 min", color: "text-primary" },
            { icon: Droplets, label: "Voda", value: "2.5L", color: "text-sf-green" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <p className="font-display font-bold text-foreground text-lg">{stat.value}</p>
              <p className="text-muted-foreground text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-around py-3">
            {[
              { icon: Home, label: "Početna", to: "/" },
              { icon: Activity, label: "Plan", to: "/dashboard", active: true },
              { icon: BarChart3, label: "Napredak", to: "/progress" },
              { icon: User, label: "Profil", to: "/dashboard" },
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

export default Dashboard;
