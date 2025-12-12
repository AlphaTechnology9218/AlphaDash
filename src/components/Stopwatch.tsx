import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Save, Clock, Trash2 } from "lucide-react";
import { TimeRecord, ScoreData } from "@/types/alphadash";
import { cn } from "@/lib/utils";

interface StopwatchProps {
  scores: ScoreData;
  savedTimes: TimeRecord[];
  onSaveTime: (record: TimeRecord) => void;
  onDeleteTime: (id: string) => void;
}

export function Stopwatch({ scores, savedTimes, onSaveTime, onDeleteTime }: StopwatchProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // F5 key handler to toggle stopwatch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F5") {
        e.preventDefault();
        setIsRunning((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleSave = () => {
    if (time > 0) {
      const record: TimeRecord = {
        id: Date.now().toString(),
        time,
        date: new Date().toLocaleString("pt-BR"),
        scores: { ...scores },
      };
      onSaveTime(record);
      handleReset();
    }
  };

  return (
    <div className="glass-card p-5 animate-slide-up">
      <div className="section-header">
        <div className="section-icon section-icon-accent">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Cronômetro
          </h2>
          <p className="text-xs text-muted-foreground">Registre seus tempos</p>
        </div>
      </div>

      <div className="text-center py-6">
        <div
          className={cn(
            "font-display text-5xl md:text-6xl font-bold tracking-tight transition-colors duration-300",
            isRunning ? "text-primary" : "text-foreground"
          )}
        >
          {formatTime(time)}
        </div>
        {isRunning && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Cronometrando...
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mb-5">
        <Button
          variant={isRunning ? "accent" : "default"}
          size="lg"
          onClick={handleStartStop}
          className="w-28"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Pausar
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Iniciar
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          variant="info"
          size="lg"
          onClick={handleSave}
          disabled={time === 0}
        >
          <Save className="w-4 h-4" /> Salvar
        </Button>
      </div>

      {savedTimes.length > 0 && (
        <div className="border-t border-border/50 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-sm text-foreground">
              Tempos Salvos
            </h3>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {savedTimes.length} registro{savedTimes.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {savedTimes.map((record, index) => (
              <div
                key={record.id}
                className="flex items-center justify-between bg-secondary/40 rounded-lg px-3 py-2 group hover:bg-secondary/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {savedTimes.length - index}
                  </span>
                  <span className="font-mono font-semibold text-sm">
                    {formatTime(record.time)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {record.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTime(record.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
