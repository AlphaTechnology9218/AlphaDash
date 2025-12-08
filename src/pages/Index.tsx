import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardView } from "@/components/views/DashboardView";
import { HistoryView } from "@/components/views/HistoryView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { SettingsView } from "@/components/views/SettingsView";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScoreData, TimeRecord, Session, defaultScoreData, calculateTotalScore, calculateMaxPossibleScore, calculateAccuracy } from "@/types/alphadash";
import { Leaf, Menu } from "lucide-react";

export type ViewType = "dashboard" | "history" | "analytics" | "settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [scores, setScores] = useLocalStorage<ScoreData>("alphadash-scores", defaultScoreData);
  const [savedTimes, setSavedTimes] = useLocalStorage<TimeRecord[]>("alphadash-times", []);
  const [sessions, setSessions] = useLocalStorage<Session[]>("alphadash-sessions", []);

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

  const handleSaveSession = (name: string) => {
    const newSession: Session = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleString("pt-BR"),
      scores: { ...scores },
      times: [...savedTimes],
      totalScore: calculateTotalScore(scores),
      maxPossibleScore: calculateMaxPossibleScore(),
      accuracyPercentage: calculateAccuracy(scores),
    };
    setSessions((prev) => [newSession, ...prev]);
    handleResetScores();
    setSavedTimes([]);
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleLoadSession = (session: Session) => {
    setScores(session.scores);
    setSavedTimes(session.times);
    setCurrentView("dashboard");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <DashboardView
            scores={scores}
            savedTimes={savedTimes}
            updateScore={updateScore}
            handleSaveTime={handleSaveTime}
            handleDeleteTime={handleDeleteTime}
            handleResetScores={handleResetScores}
            handleSaveSession={handleSaveSession}
          />
        );
      case "history":
        return (
          <HistoryView
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
            onLoadSession={handleLoadSession}
          />
        );
      case "analytics":
        return (
          <AnalyticsView
            scores={scores}
            savedTimes={savedTimes}
            sessions={sessions}
          />
        );
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-4 md:px-6">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-primary">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-gradient">
                    AlphaDash
                  </h1>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Pontuação Ecológica
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
