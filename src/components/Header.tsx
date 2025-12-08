import { Leaf, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-6 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
              AlphaDash
            </h1>
            <p className="text-sm text-muted-foreground">
              Pontuação Ecológica
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-secondary-foreground">
            Dashboard
          </span>
        </div>
      </div>
    </header>
  );
}
