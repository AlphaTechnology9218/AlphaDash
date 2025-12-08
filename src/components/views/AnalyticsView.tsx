import { useRef, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { ScoreData, TimeRecord, Session, calculateTotalScore } from "@/types/alphadash";
import { BarChart3, Download, TrendingUp, PieChart as PieChartIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

interface AnalyticsViewProps {
  scores: ScoreData;
  savedTimes: TimeRecord[];
  sessions: Session[];
}

const COLORS = {
  primary: "hsl(152, 60%, 36%)",
  primaryLight: "hsl(152, 50%, 48%)",
  accent: "hsl(28, 92%, 52%)",
  accentLight: "hsl(38, 90%, 55%)",
  info: "hsl(200, 85%, 48%)",
  infoLight: "hsl(190, 75%, 52%)",
};

export function AnalyticsView({ scores, savedTimes, sessions }: AnalyticsViewProps) {
  const chartsRef = useRef<HTMLDivElement>(null);

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
    { name: "Bonificação", value: scores.bonificacaoExpresso, color: COLORS.accent },
    {
      name: "Reflorestamento",
      value: scores.reflorestamentoAzul + scores.reflorestamentoVerde,
      color: COLORS.info,
    },
    { name: "Departamento", value: scores.departamentoEcologico, color: COLORS.accentLight },
  ].filter((item) => item.value > 0);

  const sessionTrendData = sessions.slice().reverse().slice(-10).map((session, index) => ({
    name: session.name.slice(0, 10),
    total: session.totalScore,
    accuracy: session.accuracyPercentage,
    index: index + 1,
  }));

  const timeData = savedTimes.slice().reverse().slice(-10).map((record, index) => ({
    name: `#${index + 1}`,
    time: record.time / 1000,
  }));

  const exportCharts = useCallback(async () => {
    if (!chartsRef.current) return;
    
    try {
      const canvas = await html2canvas(chartsRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = `alphadash-analytics-${new Date().toISOString().split("T")[0]}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Gráficos exportados!",
        description: "A imagem foi salva com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar os gráficos.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="section-header mb-0">
          <div className="section-icon section-icon-info">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Análises
            </h1>
            <p className="text-sm text-muted-foreground">
              Visualize seu desempenho em detalhes
            </p>
          </div>
        </div>
        <Button onClick={exportCharts} variant="default" size="sm">
          <Download className="w-4 h-4" />
          Exportar Gráficos
        </Button>
      </div>

      <div ref={chartsRef} className="space-y-6 bg-background p-4 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Current Scores */}
          <div className="glass-card p-5 animate-slide-up">
            <div className="section-header">
              <div className="section-icon">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Pontos por Categoria
                </h2>
                <p className="text-xs text-muted-foreground">Sessão atual</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 18%, 88%)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "hsl(150, 15%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(150, 15%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid hsl(150, 18%, 88%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value} pts`, "Pontos"]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-card p-5 animate-slide-up delay-100">
            <div className="section-header">
              <div className="section-icon section-icon-accent">
                <PieChartIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Distribuição
                </h2>
                <p className="text-xs text-muted-foreground">Por grupo</p>
              </div>
            </div>
            <div className="h-64">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid hsl(150, 18%, 88%)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value} pts`, ""]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Sem dados para exibir
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Session Trend */}
        {sessionTrendData.length > 1 && (
          <div className="glass-card p-5 animate-slide-up delay-200">
            <div className="section-header">
              <div className="section-icon">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Evolução das Sessões
                </h2>
                <p className="text-xs text-muted-foreground">Últimas {sessionTrendData.length} sessões</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sessionTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 18%, 88%)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "hsl(150, 15%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(150, 15%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid hsl(150, 18%, 88%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    name="Pontuação"
                    stroke={COLORS.primary}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    name="Acerto %"
                    stroke={COLORS.accent}
                    fillOpacity={1}
                    fill="url(#colorAccuracy)"
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Time Chart */}
        {timeData.length > 1 && (
          <div className="glass-card p-5 animate-slide-up delay-300">
            <div className="section-header">
              <div className="section-icon section-icon-info">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Histórico de Tempos
                </h2>
                <p className="text-xs text-muted-foreground">Últimos {timeData.length} registros (em segundos)</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 18%, 88%)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "hsl(150, 15%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(150, 15%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid hsl(150, 18%, 88%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)}s`, "Tempo"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke={COLORS.info}
                    strokeWidth={2}
                    dot={{ fill: COLORS.info, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {sessions.length === 0 && savedTimes.length < 2 && (
        <div className="glass-card p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">
            Mais dados necessários
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Salve mais sessões e tempos para visualizar gráficos de tendência e evolução.
          </p>
        </div>
      )}
    </div>
  );
}
