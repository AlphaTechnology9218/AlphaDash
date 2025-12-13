import { Session } from "@/types/alphadash";
import { History, Trash2, Play, Calendar, Target, Clock, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormResponses, FormResponse } from "@/hooks/useFormResponses";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface HistoryViewProps {
  sessions: Session[];
  onDeleteSession: (id: string) => void;
  onLoadSession: (session: Session) => void;
}

export function HistoryView({ sessions, onDeleteSession, onLoadSession }: HistoryViewProps) {
  const { responses: formResponses, isLoading: isLoadingForms, deleteResponse } = useFormResponses();
  const [showForms, setShowForms] = useState(true);
  const [expandedResponse, setExpandedResponse] = useState<string | null>(null);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Combinar sessões e respostas do Forms, ordenadas por data
  const allItems = [
    ...sessions.map((s) => ({ type: "session" as const, data: s, date: new Date(s.date).getTime() })),
    ...formResponses.map((r) => ({ type: "form" as const, data: r, date: new Date(r.timestamp).getTime() })),
  ].sort((a, b) => b.date - a.date);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="section-header">
        <div className="section-icon">
          <History className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Histórico Completo
          </h1>
          <p className="text-sm text-muted-foreground">
            {sessions.length} sessão{sessions.length !== 1 ? "ões" : ""} • {formResponses.length} resposta{formResponses.length !== 1 ? "s" : ""} do Forms
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForms(!showForms)}
        >
          <FileText className="w-4 h-4 mr-2" />
          {showForms ? "Ocultar" : "Mostrar"} Forms
        </Button>
      </div>

      {allItems.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
            <History className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">
            Nenhum histórico disponível
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Salve suas sessões no Dashboard ou sincronize respostas do Google Forms para ver o histórico aqui.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allItems.map((item, index) => {
            if (item.type === "session") {
              const session = item.data as Session;
              return (
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
              );
            } else if (item.type === "form" && showForms) {
              const response = item.data as FormResponse;
              const isExpanded = expandedResponse === response.responseId;
              
              return (
                <div
                  key={`form-${response.responseId}`}
                  className="glass-card p-5 animate-slide-up group border-l-4 border-accent"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-accent" />
                        <h3 className="font-display font-bold text-lg text-foreground truncate">
                          Resposta do Formulário
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/15 text-accent">
                          Forms
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(response.timestamp)}
                        </span>
                        {response.respondentEmail && (
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4" />
                            {response.respondentEmail}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          {Object.keys(response.answers || {}).length} resposta{Object.keys(response.answers || {}).length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Collapsible
                        open={isExpanded}
                        onOpenChange={(open) => setExpandedResponse(open ? response.responseId : null)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm">
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                            {isExpanded ? "Ocultar" : "Ver"} Respostas
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteResponse(response.responseId)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Form Answers */}
                  <Collapsible open={isExpanded} onOpenChange={(open) => setExpandedResponse(open ? response.responseId : null)}>
                    <CollapsibleContent className="mt-4 pt-4 border-t border-border/50">
                      <div className="space-y-3">
                        {Object.entries(response.answers || {}).map(([question, answer]) => (
                          <div key={question} className="flex flex-col gap-1">
                            <div className="text-sm font-semibold text-foreground">{question}</div>
                            <div className="text-sm text-muted-foreground bg-secondary/50 p-2 rounded-md">
                              {answer !== null && answer !== undefined ? String(answer) : "Sem resposta"}
                            </div>
                          </div>
                        ))}
                        {Object.keys(response.answers || {}).length === 0 && (
                          <div className="text-sm text-muted-foreground text-center py-4">
                            Nenhuma resposta disponível
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
