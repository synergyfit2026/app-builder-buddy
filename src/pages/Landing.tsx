import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, Utensils, Brain, Target, Camera, TrendingUp, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-fitness.jpg";
import sportStrength from "@/assets/sport-strength.jpg";
import sportNutrition from "@/assets/sport-nutrition.jpg";
import sportCardio from "@/assets/sport-cardio.jpg";

const Navbar = () => {
  const { user, signOut } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl text-foreground">SynergyFit</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Funkcionalnosti</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Kako radi</a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Cene</a>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="bg-gradient-primary text-primary-foreground font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Odjavi se
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1"
              >
                <LogIn className="w-4 h-4" />
                Prijava
              </Link>
              <Link
                to="/auth"
                className="bg-gradient-primary text-primary-foreground font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Započni besplatno
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { user } = useAuth();
  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <div className="absolute inset-0">
      <img src={heroImage} alt="SynergyFit fitness" className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
    </div>
    <div className="relative container mx-auto px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
          AI-powered fitness & nutrition
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
          Pametni partner za{" "}
          <span className="text-gradient">tvoje zdravlje</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Personalizovani planovi treninga i ishrane koji se prilagođavaju tvom stvarnom životu — u realnom vremenu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={user ? "/onboarding" : "/auth"}
            className="bg-gradient-primary text-primary-foreground font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity glow-primary"
          >
            Započni transformaciju
          </Link>
          <a
            href="#features"
            className="border border-border text-foreground font-semibold px-8 py-4 rounded-xl text-lg hover:bg-secondary transition-colors"
          >
            Saznaj više
          </a>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

const features = [
  { icon: Brain, title: "AI personalizacija", desc: "Planovi se prilagođavaju u realnom vremenu na osnovu tvog ponašanja i napretka." },
  { icon: Dumbbell, title: "Integrisani treninzi", desc: "Plan treninga povezan sa ishranom — preskočiš trening, plan se automatski adaptira." },
  { icon: Utensils, title: "Pametna ishrana", desc: "Prepoznavanje obroka kamerom, prilagođeno budžetu i lokalnim namirnicama." },
  { icon: Target, title: "Mali ciljevi", desc: "Fokus na dostižne korake koji grade dugoročne zdrave navike." },
  { icon: Camera, title: "Scan obroka", desc: "Slikaj obrok — AI prepoznaje namirnice i računa kalorije." },
  { icon: TrendingUp, title: "Praćenje napretka", desc: "Detaljna statistika i motivacione poruke za kontinuitet." },
];

const Features = () => (
  <section id="features" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Sve što ti <span className="text-gradient">treba</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Jedinstven sistem koji povezuje trening, ishranu i tvoj životni stil.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const showcaseImages = [
  { src: sportStrength, label: "Trening snage", desc: "Personalizovani programi za svaki nivo" },
  { src: sportNutrition, label: "Zdrava ishrana", desc: "Planovi obroka prilagođeni tvom budžetu" },
  { src: sportCardio, label: "Kardio & Izdržljivost", desc: "Treninzi koji se uklapaju u tvoj dan" },
];

const Showcase = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Treniraj <span className="text-gradient">pametnije</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Sve što ti treba za zdraviji život — na jednom mestu.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {showcaseImages.map((img, i) => (
          <motion.div
            key={img.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display font-bold text-lg text-background">{img.label}</h3>
              <p className="text-background/80 text-sm">{img.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  { num: "01", title: "Unesi podatke", desc: "Ciljevi, nivo aktivnosti, preferencije ishrane." },
  { num: "02", title: "AI generiše plan", desc: "Personalizovan plan treninga i ishrane samo za tebe." },
  { num: "03", title: "Prati i prilagođavaj", desc: "Sistem se automatski adaptira tvom napretku." },
  { num: "04", title: "Ostvari rezultate", desc: "Održivi rezultati kroz male, dostižne korake." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Kako <span className="text-gradient">radi</span>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <span className="text-6xl font-display font-bold text-gradient opacity-40">{s.num}</span>
            <h3 className="font-display font-semibold text-lg mt-4 mb-2 text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Izaberi <span className="text-gradient">plan</span>
        </h2>
        <p className="text-muted-foreground text-lg">Započni besplatno, nadogradi kad budeš spreman.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="font-display font-semibold text-xl mb-2 text-foreground">Free</h3>
          <p className="text-muted-foreground text-sm mb-6">Započni bez rizika</p>
          <div className="mb-6">
            <span className="font-display text-4xl font-bold text-foreground">$0</span>
            <span className="text-muted-foreground text-sm">/mesečno</span>
          </div>
          <ul className="space-y-3 mb-8">
            {["Osnovni plan treninga", "Praćenje aktivnosti", "Evidencija treninga", "Ograničene AI sugestije"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/auth" className="block text-center border border-border text-foreground font-semibold py-3 rounded-xl hover:bg-secondary transition-colors">
            Započni besplatno
          </Link>
        </motion.div>
        {/* Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 border-primary/30 glow-primary relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            POPULAR
          </div>
          <h3 className="font-display font-semibold text-xl mb-2 text-foreground">Premium</h3>
          <p className="text-muted-foreground text-sm mb-6">Potpuna kontrola i personalizacija</p>
          <div className="mb-6">
            <span className="font-display text-4xl font-bold text-foreground">$9.99</span>
            <span className="text-muted-foreground text-sm">/mesečno</span>
          </div>
          <ul className="space-y-3 mb-8">
            {["Integrisani plan ishrane", "Napredna AI personalizacija", "Prepoznavanje obroka kamerom", "Detaljna statistika", "Prioritetna podrška"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/auth" className="block text-center bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
            Započni Premium
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-foreground">SynergyFit</span>
      </div>
      <p className="text-muted-foreground text-sm">© 2026 SynergyFit. Sva prava zadržana.</p>
    </div>
  </footer>
);

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Features />
    <Showcase />
    <HowItWorks />
    <Pricing />
    <Footer />
  </div>
);

export default Landing;
