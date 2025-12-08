import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Save, Clock, Trash2 } from "lucide-react";
import { TimeRecord, ScoreData } from "@/types/alphadash";

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
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
          <Clock className="w-5 h-5 text-accent-foreground" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Cronômetro
        </h2>
      </div>

      <div className="text-center mb-6">
        <div
          className={`font-display text-5xl md:text-6xl font-bold tracking-wider ${
            isRunning ? "text-primary" : "text-foreground"
          } transition-colors duration-300`}
        >
          {formatTime(time)}
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <Button
          variant={isRunning ? "accent" : "default"}
          size="lg"
          onClick={handleStartStop}
          className="w-32"
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" /> Pausar
            </>
          ) : (
            <>
              <Play className="w-5 h-5" /> Iniciar
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" onClick={handleReset}>
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button
          variant="info"
          size="lg"
          onClick={handleSave}
          disabled={time === 0}
        >
          <Save className="w-5 h-5" /> Salvar
        </Button>
      </div>

      {savedTimes.length > 0 && (
        <div className="border-t border-border pt-4">
          <h3 className="font-display font-semibold text-foreground mb-3">
            Tempos Salvos
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savedTimes.map((record, index) => (
              <div
                key={record.id}
                className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary font-semibold">
                    #{savedTimes.length - index}
                  </span>
                  <span className="font-mono font-medium">
                    {formatTime(record.time)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {record.date}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTime(record.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
