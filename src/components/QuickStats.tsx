import { ScoreData, TimeRecord, calculateTotalScore, calculateMaxPossibleScore, calculateAccuracy } from "@/types/alphadash";
import { TrendingUp, Clock, Target, Percent } from "lucide-react";

interface QuickStatsProps {
  scores: ScoreData;
  savedTimes: TimeRecord[];
}

export function QuickStats({ scores, savedTimes }: QuickStatsProps) {
  const total = calculateTotalScore(scores);
  const max = calculateMaxPossibleScore();
  const accuracy = calculateAccuracy(scores);
  const avgTime = savedTimes.length > 0
    ? savedTimes.reduce((acc, t) => acc + t.time, 0) / savedTimes.length
    : 0;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const stats = [
    {
      label: "Pontuação Total",
      value: total,
      suffix: `/${max}`,
      icon: TrendingUp,
      color: "primary",
    },
    {
      label: "Taxa de Acerto",
      value: accuracy,
      suffix: "%",
      icon: Percent,
      color: accuracy >= 70 ? "primary" : accuracy >= 40 ? "accent" : "destructive",
    },
    {
      label: "Tempos Salvos",
      value: savedTimes.length,
      suffix: "",
      icon: Clock,
      color: "info",
    },
    {
      label: "Tempo Médio",
      value: formatTime(avgTime),
      suffix: "",
      icon: Target,
      color: "accent",
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "accent":
        return "text-accent";
      case "info":
        return "text-info";
      case "destructive":
        return "text-destructive";
      default:
        return "text-foreground";
    }
  };

  const getBgClass = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10";
      case "accent":
        return "bg-accent/10";
      case "info":
        return "bg-info/10";
      case "destructive":
        return "bg-destructive/10";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="stat-card"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`w-9 h-9 rounded-xl ${getBgClass(stat.color)} flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${getColorClass(stat.color)}`} />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className={`text-2xl font-display font-bold ${getColorClass(stat.color)}`}>
              {stat.value}
              <span className="text-sm font-normal text-muted-foreground">{stat.suffix}</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
