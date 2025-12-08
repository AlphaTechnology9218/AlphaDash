import { useState } from "react";
import { Header } from "@/components/Header";
import { ScoreSelector } from "@/components/ScoreSelector";
import { Stopwatch } from "@/components/Stopwatch";
import { ScoreCharts } from "@/components/ScoreCharts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScoreData, TimeRecord, defaultScoreData } from "@/types/alphadash";
import { Zap, Gift, TreePine, Building2, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Index = () => {
  const [scores, setScores] = useLocalStorage<ScoreData>("alphadash-scores", defaultScoreData);
  const [savedTimes, setSavedTimes] = useLocalStorage<TimeRecord[]>("alphadash-times", []);

  const updateScore = (key: keyof ScoreData, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTime = (record: TimeRecord) => {
    setSavedTimes((prev) => [record, ...prev]);
  };

  const handleDeleteTime = (id: string) => {
    setSavedTimes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResetScores = () => {
    setScores(defaultScoreData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Score Selectors */}
          <div className="lg:col-span-2 space-y-4">
            {/* Section: Expresso Ecológico */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Expresso Ecológico
                </h2>
                <Button variant="ghost" size="sm" onClick={handleResetScores}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Resetar
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ScoreSelector
                  label="Expresso 1"
                  options={[0, 25, 55]}
                  value={scores.expressoEcologico1}
                  onChange={(v) => updateScore("expressoEcologico1", v)}
                  variant="primary"
                  icon={<Zap className="w-4 h-4" />}
                />
                <ScoreSelector
                  label="Expresso 2"
                  options={[0, 25, 55]}
                  value={scores.expressoEcologico2}
                  onChange={(v) => updateScore("expressoEcologico2", v)}
                  variant="primary"
                  icon={<Zap className="w-4 h-4" />}
                />
                <ScoreSelector
                  label="Expresso 3"
                  options={[0, 25, 55]}
                  value={scores.expressoEcologico3}
                  onChange={(v) => updateScore("expressoEcologico3", v)}
                  variant="primary"
                  icon={<Zap className="w-4 h-4" />}
                />
                <ScoreSelector
                  label="Expresso 4"
                  options={[0, 25, 55]}
                  value={scores.expressoEcologico4}
                  onChange={(v) => updateScore("expressoEcologico4", v)}
                  variant="primary"
                  icon={<Zap className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Bonificação */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent" />
                Bonificação
              </h2>
              <ScoreSelector
                label="Bonificação do Expresso"
                options={[0, 50]}
                value={scores.bonificacaoExpresso}
                onChange={(v) => updateScore("bonificacaoExpresso", v)}
                variant="accent"
                icon={<Gift className="w-4 h-4" />}
              />
            </div>

            {/* Reflorestamento */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <TreePine className="w-5 h-5 text-info" />
                Reflorestamento
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ScoreSelector
                  label="Reflorestamento Azul"
                  options={[0, 25, 50, 75]}
                  value={scores.reflorestamentoAzul}
                  onChange={(v) => updateScore("reflorestamentoAzul", v)}
                  variant="info"
                  icon={<TreePine className="w-4 h-4" />}
                />
                <ScoreSelector
                  label="Reflorestamento Verde"
                  options={[0, 25, 50, 75]}
                  value={scores.reflorestamentoVerde}
                  onChange={(v) => updateScore("reflorestamentoVerde", v)}
                  variant="primary"
                  icon={<TreeDeciduous className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Departamento Ecológico */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent" />
                Departamento Ecológico
              </h2>
              <ScoreSelector
                label="Departamento Ecológico"
                options={[0, 40, 80]}
                value={scores.departamentoEcologico}
                onChange={(v) => updateScore("departamentoEcologico", v)}
                variant="accent"
                icon={<Building2 className="w-4 h-4" />}
              />
            </div>

            {/* Stopwatch */}
            <Stopwatch
              scores={scores}
              savedTimes={savedTimes}
              onSaveTime={handleSaveTime}
              onDeleteTime={handleDeleteTime}
            />
          </div>

          {/* Right Column - Charts */}
          <div className="space-y-6">
            <ScoreCharts scores={scores} savedTimes={savedTimes} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
