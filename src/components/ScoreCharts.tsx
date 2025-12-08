import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ScoreData, TimeRecord } from "@/types/alphadash";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface ScoreChartsProps {
  scores: ScoreData;
  savedTimes: TimeRecord[];
}

const COLORS = {
  primary: "hsl(145, 63%, 32%)",
  primaryLight: "hsl(145, 50%, 45%)",
  accent: "hsl(25, 95%, 53%)",
  accentLight: "hsl(35, 95%, 58%)",
  info: "hsl(195, 85%, 45%)",
  infoLight: "hsl(180, 70%, 50%)",
  secondary: "hsl(145, 30%, 60%)",
};

export function ScoreCharts({ scores, savedTimes }: ScoreChartsProps) {
  const barData = [
    { name: "Exp. 1", value: scores.expressoEcologico1, fill: COLORS.primary },
    { name: "Exp. 2", value: scores.expressoEcologico2, fill: COLORS.primaryLight },
    { name: "Exp. 3", value: scores.expressoEcologico3, fill: COLORS.primary },
    { name: "Exp. 4", value: scores.expressoEcologico4, fill: COLORS.primaryLight },
    { name: "Bônus", value: scores.bonificacaoExpresso, fill: COLORS.accent },
    { name: "Refl. Azul", value: scores.reflorestamentoAzul, fill: COLORS.info },
    { name: "Refl. Verde", value: scores.reflorestamentoVerde, fill: COLORS.primary },
    { name: "Depart.", value: scores.departamentoEcologico, fill: COLORS.accentLight },
  ];

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
  ].filter((item) => item.value > 0);

  const totalScore =
    scores.expressoEcologico1 +
    scores.expressoEcologico2 +
    scores.expressoEcologico3 +
    scores.expressoEcologico4 +
    scores.bonificacaoExpresso +
    scores.reflorestamentoAzul +
    scores.reflorestamentoVerde +
    scores.departamentoEcologico;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Total Score Card */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <h2 className="font-display text-lg text-muted-foreground mb-2">
          Pontuação Total
        </h2>
        <div className="font-display text-6xl font-bold gradient-primary bg-clip-text text-transparent">
          {totalScore}
        </div>
        <p className="text-muted-foreground mt-2">pontos</p>
      </div>

      {/* Bar Chart */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Pontos por Categoria
          </h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(145, 20%, 85%)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(150, 15%, 45%)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(150, 15%, 45%)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(145, 20%, 85%)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px -4px hsl(145, 30%, 20%, 0.15)",
                }}
                labelStyle={{ fontWeight: 600, color: "hsl(150, 30%, 12%)" }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      {pieData.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-info flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-info-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Distribuição de Pontos
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(145, 20%, 85%)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px -4px hsl(145, 30%, 20%, 0.15)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* History Chart */}
      {savedTimes.length > 1 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">
            Histórico de Pontuações
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={savedTimes.slice(-10).map((record, index) => ({
                  name: `#${index + 1}`,
                  total:
                    record.scores.expressoEcologico1 +
                    record.scores.expressoEcologico2 +
                    record.scores.expressoEcologico3 +
                    record.scores.expressoEcologico4 +
                    record.scores.bonificacaoExpresso +
                    record.scores.reflorestamentoAzul +
                    record.scores.reflorestamentoVerde +
                    record.scores.departamentoEcologico,
                }))}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(145, 20%, 85%)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "hsl(150, 15%, 45%)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(150, 15%, 45%)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(145, 20%, 85%)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="total" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
