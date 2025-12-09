import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ScoreData, calculateTotalScore, calculateMaxPossibleScore, calculateAccuracy } from "@/types/alphadash";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreOverviewProps {
  scores: ScoreData;
}

const COLORS = {
  primary: "hsl(152, 60%, 36%)",
  primaryLight: "hsl(152, 50%, 48%)",
  accent: "hsl(28, 92%, 52%)",
  accentLight: "hsl(38, 90%, 55%)",
  info: "hsl(200, 85%, 48%)",
  infoLight: "hsl(190, 75%, 52%)",
  muted: "hsl(150, 15%, 85%)",
};

export function ScoreOverview({ scores }: ScoreOverviewProps) {
  const total = calculateTotalScore(scores);
  const max = calculateMaxPossibleScore();
  const accuracy = calculateAccuracy(scores);

  const pieData = [
    {
      name: "Expresso Ecológico",
      value:
        scores.expressoEcologico1 +
        scores.expressoEcologico2 +
        scores.expressoEcologico3 +
        scores.expressoEcologico4,
      color: COLORS.primary,
    },
    {
      name: "Bonificação",
      value: scores.bonificacaoExpresso,
      color: COLORS.accent,
    },
    {
      name: "Reflorestamento",
      value: scores.reflorestamentoAzul + scores.reflorestamentoVerde,
      color: COLORS.info,
    },
    {
      name: "Departamento",
      value: scores.departamentoEcologico,
      color: COLORS.accentLight,
    },
  ];

  const activePieData = pieData.filter((item) => item.value > 0);
  const hasData = activePieData.length > 0;

  const getAccuracyLabel = () => {
    if (accuracy >= 80) return { text: "Excelente", color: "text-primary" };
    if (accuracy >= 60) return { text: "Bom", color: "text-info" };
    if (accuracy >= 40) return { text: "Regular", color: "text-accent" };
    return { text: "Baixo", color: "text-destructive" };
  };

  const accuracyLabel = getAccuracyLabel();

  return (
    <div className="glass-card-elevated p-5 animate-slide-up sticky top-24">
      <div className="section-header">
        <div className="section-icon">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Resumo
          </h2>
          <p className="text-xs text-muted-foreground">Sua pontuação atual</p>
        </div>
      </div>

      {/* Total Score */}
      <div className="text-center py-4 border-b border-border/50">
        <div className="text-5xl font-display font-bold text-primary mb-1">
          {total}
        </div>
        <p className="text-sm text-muted-foreground">
          de {max} pontos possíveis
        </p>
      </div>

      {/* Accuracy */}
      <div className="py-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Taxa de Acerto</span>
          <span className={cn("text-sm font-semibold", accuracyLabel.color)}>
            {accuracyLabel.text}
          </span>
        </div>
        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-500 rounded-full"
            style={{ width: `${accuracy}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-muted-foreground">0%</span>
          <span className="text-xs font-semibold text-primary">{accuracy}%</span>
          <span className="text-xs text-muted-foreground">100%</span>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="py-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Distribuição</h3>
        {hasData ? (
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {activePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(150, 18%, 88%)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value} pts`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-44 flex items-center justify-center text-muted-foreground text-sm">
            Selecione pontos para ver a distribuição
          </div>
        )}

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
