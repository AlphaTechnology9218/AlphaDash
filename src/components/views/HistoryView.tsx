import { Session } from "@/types/alphadash";
import { History, Trash2, Play, Calendar, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HistoryViewProps {
  sessions: Session[];
  onDeleteSession: (id: string) => void;
  onLoadSession: (session: Session) => void;
}

export function HistoryView({ sessions, onDeleteSession, onLoadSession }: HistoryViewProps) {
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="section-header">
        <div className="section-icon">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Histórico de Sessões
          </h1>
          <p className="text-sm text-muted-foreground">
            {sessions.length} sessão{sessions.length !== 1 ? "ões" : ""} salva{sessions.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
            <History className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">
            Nenhuma sessão salva
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Salve suas sessões no Dashboard para acompanhar seu progresso ao longo do tempo.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="glass-card p-5 animate-slide-up group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-lg text-foreground truncate">
                      {session.name}
                    </h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      session.accuracyPercentage >= 70
                        ? "bg-primary/15 text-primary"
                        : session.accuracyPercentage >= 40
                        ? "bg-accent/15 text-accent"
                        : "bg-destructive/15 text-destructive"
                    )}>
                      {session.accuracyPercentage}%
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Target className="w-4 h-4" />
                      {session.totalScore}/{session.maxPossibleScore} pts
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {session.times.length} tempo{session.times.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onLoadSession(session)}
                  >
                    <Play className="w-4 h-4" />
                    Carregar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSession(session.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Score Details */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {Object.entries(session.scores).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={cn(
                        "text-lg font-bold",
                        value > 0 ? "text-primary" : "text-muted-foreground"
                      )}>
                        {value}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {key.replace(/([A-Z])/g, ' $1').replace(/ecologico/i, '').trim().slice(0, 8)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
