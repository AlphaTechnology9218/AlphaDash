import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScoreSelectorProps {
  label: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
  variant?: "primary" | "accent" | "info";
  icon?: React.ReactNode;
  maxScore?: number;
}

export function ScoreSelector({
  label,
  options,
  value,
  onChange,
  variant = "primary",
  icon,
  maxScore,
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

  const getIconBgClass = () => {
    switch (variant) {
      case "accent":
        return "bg-accent/15 text-accent";
      case "info":
        return "bg-info/15 text-info";
      default:
        return "bg-primary/15 text-primary";
    }
  };

  const percentage = maxScore ? Math.round((value / maxScore) * 100) : null;

  return (
    <div className="glass-card p-4 animate-scale-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className={cn("w-8 h-8 rounded-lg flex items-center justify-center", getIconBgClass())}>
              {icon}
            </span>
          )}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground">{label}</h3>
            {percentage !== null && (
              <p className="text-xs text-muted-foreground">{percentage}% do máximo</p>
            )}
          </div>
        </div>
        <div className={cn(
          "text-lg font-bold font-display",
          value > 0 ? "text-primary" : "text-muted-foreground"
        )}>
          {value}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={value === option ? getActiveVariant() : "score"}
            size="score"
            onClick={() => onChange(option)}
            className="flex-1 min-w-[56px]"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
