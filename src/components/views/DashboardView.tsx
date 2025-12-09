import { ScoreSelector } from "@/components/ScoreSelector";
import { Stopwatch } from "@/components/Stopwatch";
import { ScoreOverview } from "@/components/ScoreOverview";
import { QuickStats } from "@/components/QuickStats";
import { ScoreData, TimeRecord, MAX_SCORES } from "@/types/alphadash";
import { Zap, Gift, TreePine, Building2, TreeDeciduous, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface DashboardViewProps {
  scores: ScoreData;
  savedTimes: TimeRecord[];
  updateScore: (key: keyof ScoreData, value: number) => void;
  handleSaveTime: (record: TimeRecord) => void;
  handleDeleteTime: (id: string) => void;
  handleResetScores: () => void;
  handleSaveSession: (name: string) => void;
}

export function DashboardView({
  scores,
  savedTimes,
  updateScore,
  handleSaveTime,
  handleDeleteTime,
  handleResetScores,
  handleSaveSession,
}: DashboardViewProps) {
  const [sessionName, setSessionName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSaveSession = () => {
    if (sessionName.trim()) {
      handleSaveSession(sessionName.trim());
      setSessionName("");
      setDialogOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Quick Stats */}
      <QuickStats scores={scores} savedTimes={savedTimes} />

      {/* Stopwatch at the top */}
      <Stopwatch
        scores={scores}
        savedTimes={savedTimes}
        onSaveTime={handleSaveTime}
        onDeleteTime={handleDeleteTime}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={handleResetScores}>
              <RotateCcw className="w-4 h-4" />
              Resetar Pontos
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Save className="w-4 h-4" />
                  Salvar Sessão
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display">Salvar Sessão</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Nome da sessão (ex: Treino 01)"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSaveSession()}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={onSaveSession} disabled={!sessionName.trim()}>
                      Salvar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Expresso Ecológico */}
          <section className="space-y-4">
            <div className="section-header">
              <div className="section-icon">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Expresso Ecológico
                </h2>
                <p className="text-xs text-muted-foreground">4 categorias • Máx. {MAX_SCORES.expressoEcologico} pts cada</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <ScoreSelector
                  key={num}
                  label={`Expresso ${num}`}
                  options={[0, 25, 55]}
                  value={scores[`expressoEcologico${num}` as keyof ScoreData] as number}
                  onChange={(v) => updateScore(`expressoEcologico${num}` as keyof ScoreData, v)}
                  variant="primary"
                  icon={<Zap className="w-4 h-4" />}
                  maxScore={MAX_SCORES.expressoEcologico}
                />
              ))}
            </div>
          </section>

          {/* Bonificação */}
          <section className="space-y-4">
            <div className="section-header">
              <div className="section-icon section-icon-accent">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Bonificação
                </h2>
                <p className="text-xs text-muted-foreground">Máx. {MAX_SCORES.bonificacaoExpresso} pts</p>
              </div>
            </div>
            <ScoreSelector
              label="Bonificação do Expresso"
              options={[0, 50]}
              value={scores.bonificacaoExpresso}
              onChange={(v) => updateScore("bonificacaoExpresso", v)}
              variant="accent"
              icon={<Gift className="w-4 h-4" />}
              maxScore={MAX_SCORES.bonificacaoExpresso}
            />
          </section>

          {/* Reflorestamento */}
          <section className="space-y-4">
            <div className="section-header">
              <div className="section-icon section-icon-info">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Reflorestamento
                </h2>
                <p className="text-xs text-muted-foreground">2 categorias • Máx. {MAX_SCORES.reflorestamento} pts cada</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScoreSelector
                label="Reflorestamento Azul"
                options={[0, 25, 50, 75]}
                value={scores.reflorestamentoAzul}
                onChange={(v) => updateScore("reflorestamentoAzul", v)}
                variant="info"
                icon={<TreePine className="w-4 h-4" />}
                maxScore={MAX_SCORES.reflorestamento}
              />
              <ScoreSelector
                label="Reflorestamento Verde"
                options={[0, 25, 50, 75]}
                value={scores.reflorestamentoVerde}
                onChange={(v) => updateScore("reflorestamentoVerde", v)}
                variant="primary"
                icon={<TreeDeciduous className="w-4 h-4" />}
                maxScore={MAX_SCORES.reflorestamento}
              />
            </div>
          </section>

          {/* Departamento Ecológico */}
          <section className="space-y-4">
            <div className="section-header">
              <div className="section-icon section-icon-accent">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Departamento Ecológico
                </h2>
                <p className="text-xs text-muted-foreground">Máx. {MAX_SCORES.departamentoEcologico} pts</p>
              </div>
            </div>
            <ScoreSelector
              label="Departamento Ecológico"
              options={[0, 40, 80]}
              value={scores.departamentoEcologico}
              onChange={(v) => updateScore("departamentoEcologico", v)}
              variant="accent"
              icon={<Building2 className="w-4 h-4" />}
              maxScore={MAX_SCORES.departamentoEcologico}
            />
          </section>
        </div>

        {/* Sidebar - Score Overview */}
        <div className="space-y-6">
          <ScoreOverview scores={scores} />
        </div>
      </div>
    </div>
  );
}
