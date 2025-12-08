import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScoreSelectorProps {
  label: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
  variant?: "primary" | "accent" | "info";
  icon?: React.ReactNode;
}

export function ScoreSelector({
  label,
  options,
  value,
  onChange,
  variant = "primary",
  icon,
}: ScoreSelectorProps) {
  const getActiveVariant = () => {
    switch (variant) {
      case "accent":
        return "scoreAccent";
      case "info":
        return "scoreInfo";
      default:
        return "scoreActive";
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case "accent":
        return "border-accent/30";
      case "info":
        return "border-info/30";
      default:
        return "border-primary/30";
    }
  };

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 animate-slide-up",
        getBorderColor()
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && (
          <span className="text-primary">{icon}</span>
        )}
        <h3 className="font-display font-semibold text-foreground">{label}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={value === option ? getActiveVariant() : "score"}
            size="score"
            onClick={() => onChange(option)}
            className="min-w-[60px]"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
