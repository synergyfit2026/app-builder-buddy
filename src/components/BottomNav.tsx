import { Link, useLocation } from "react-router-dom";
import { Utensils, Activity, BarChart3, User } from "lucide-react";

const navItems = [
  { icon: Utensils, label: "Plan ishrane", to: "/" },
  { icon: Activity, label: "Plan treninga", to: "/dashboard" },
  { icon: BarChart3, label: "Napredak", to: "/progress" },
  { icon: User, label: "Profil", to: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
