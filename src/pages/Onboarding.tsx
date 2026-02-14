import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, ArrowRight, ArrowLeft, Check } from "lucide-react";

type Goal = "weight_loss" | "muscle" | "health" | "flexibility";

interface UserData {
  goal: Goal | null;
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
  trainingDays: string;
}

const goals: { id: Goal; label: string; emoji: string }[] = [
  { id: "weight_loss", label: "Mršavljenje", emoji: "🔥" },
  { id: "muscle", label: "Mišićna masa", emoji: "💪" },
  { id: "health", label: "Zdraviji život", emoji: "🌿" },
  { id: "flexibility", label: "Fleksibilnost", emoji: "🧘" },
];

const activityLevels = [
  { id: "beginner", label: "Početnik", desc: "Malo ili bez vežbanja" },
  { id: "moderate", label: "Umeren", desc: "2-3 treninga nedeljno" },
  { id: "active", label: "Aktivan", desc: "4-5 treninga nedeljno" },
  { id: "athlete", label: "Sportista", desc: "6+ treninga nedeljno" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserData>({
    goal: null,
    age: "",
    weight: "",
    height: "",
    activityLevel: "",
    trainingDays: "3",
  });

  const totalSteps = 3;

  const canContinue = () => {
    if (step === 0) return data.goal !== null;
    if (step === 1) return data.age && data.weight && data.height;
    if (step === 2) return data.activityLevel;
    return false;
  };

  const handleFinish = () => {
    localStorage.setItem("sf_user", JSON.stringify(data));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">SynergyFit</span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= step ? "w-8 bg-gradient-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-3xl font-bold mb-2 text-foreground">Koji je tvoj cilj?</h2>
                <p className="text-muted-foreground mb-8">Izaberi primarni cilj za personalizovan plan.</p>
                <div className="grid grid-cols-2 gap-4">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setData({ ...data, goal: g.id })}
                      className={`glass-card p-5 text-left transition-all ${
                        data.goal === g.id
                          ? "border-primary/50 glow-primary"
                          : "hover:border-border"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{g.emoji}</span>
                      <span className="font-display font-semibold text-foreground">{g.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-3xl font-bold mb-2 text-foreground">Tvoji podaci</h2>
                <p className="text-muted-foreground mb-8">Potrebno za personalizaciju plana.</p>
                <div className="space-y-4">
                  {[
                    { key: "age" as const, label: "Godine", placeholder: "27", suffix: "god" },
                    { key: "weight" as const, label: "Težina", placeholder: "75", suffix: "kg" },
                    { key: "height" as const, label: "Visina", placeholder: "182", suffix: "cm" },
                  ].map((field) => (
                    <div key={field.key} className="glass-card p-4 flex items-center gap-4">
                      <label className="font-display font-medium text-foreground w-20">{field.label}</label>
                      <input
                        type="number"
                        placeholder={field.placeholder}
                        value={data[field.key]}
                        onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                        className="flex-1 bg-transparent text-foreground text-lg outline-none font-display"
                      />
                      <span className="text-muted-foreground text-sm">{field.suffix}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-3xl font-bold mb-2 text-foreground">Nivo aktivnosti</h2>
                <p className="text-muted-foreground mb-8">Koliko trenutno vežbaš?</p>
                <div className="space-y-3">
                  {activityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setData({ ...data, activityLevel: level.id })}
                      className={`glass-card p-4 w-full text-left flex items-center justify-between transition-all ${
                        data.activityLevel === level.id
                          ? "border-primary/50 glow-primary"
                          : "hover:border-border"
                      }`}
                    >
                      <div>
                        <span className="font-display font-semibold text-foreground">{level.label}</span>
                        <p className="text-muted-foreground text-sm">{level.desc}</p>
                      </div>
                      {data.activityLevel === level.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => step > 0 ? setStep(step - 1) : navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Nazad
            </button>
            <button
              onClick={() => step < totalSteps - 1 ? setStep(step + 1) : handleFinish()}
              disabled={!canContinue()}
              className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === totalSteps - 1 ? "Generiši plan" : "Dalje"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
